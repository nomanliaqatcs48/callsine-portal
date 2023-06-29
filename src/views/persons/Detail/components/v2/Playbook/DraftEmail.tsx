import { Divider, FormHelperText } from "@mui/material";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import ReactSelect from "../../../../../../ui-component/dropdowns/ReactSelect";
import MyEditor from "../../../../../../ui-component/editor/MyEditor";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMailAccounts } from "../../../../../../hooks/mail-accounts/useMailAccounts";
import { ErrorMessage } from "@hookform/error-message";
import { useParams } from "react-router-dom";
import { emailAddressPattern } from "../../../../../../helpers/forms";
import { devLog, devLogError } from "../../../../../../helpers/logs";
import {
  createAsEmailService,
  sendEmailService,
} from "../../../../../../services/emails.service";
import { ToastError, ToastSuccess } from "../../../../../../helpers/toast";
import SendLater from "../../../../../../ui-component/buttons/SendLater";
import { LoadingButton } from "@mui/lab";
import moment from "moment";
import { usePlaybook } from "../../../../../../hooks/persons/usePlaybook";
import {
  insertBodyLoader,
  removeBodyLoader,
} from "../../../../../../helpers/loaders";
import { useEmailsTab } from "../../../../../../hooks/persons/useEmailsTab";
import _ from "lodash";

type DraftEmailTypes = {
  onLoadApi: any;
  playBookData: any;
  selectedData: any;
  position: any;
  selectedSequenceEvent: any;
};

const DraftEmail = ({
  onLoadApi,
  playBookData,
  selectedData,
  position,
  selectedSequenceEvent,
}: DraftEmailTypes) => {
  const { id: personId } = useParams();
  const [open, setOpen] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<any>({
    onPage: true,
    form: false,
    in_reply_to: false,
    from_email: false,
    subject: false,
  });
  const [currentSignature, setCurrentSignature] = useState<string>("");
  const {
    register,
    unregister,
    setValue,
    handleSubmit,
    reset,
    getValues,
    trigger,
    setError,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const { mailAccountsData } = useMailAccounts(open);
  const { regeneratePlaybook, updateProspectSequenceEvent } =
    usePlaybook(false);
  const { emails } = useEmailsTab(open, {
    limit: 99999,
    offset: 0,
  });
  let countIndexForEmailSubject: number = 0;

  devLog(() => {
    console.log("errors", errors);
    console.log("POSITION");
    console.log(position);
  });

  useEffect(() => {
    setIsLoading((prev: any) => ({
      ...prev,
      from_email: true,
      in_reply_to: true,
    }));
    devLog(() => {
      console.log("selectedData", selectedData);
    });
    [
      "in_reply_to",
      "person",
      "from_email",
      "html_message",
      "scheduled_time",
    ].map((item: any) => {
      // register
      if (item !== "in_reply_to") {
        register(item, { required: "This is required field." });
      } else {
        register(item);
      }

      // set values
      if (item === "person") {
        setValue("person", Number(personId));
      } else if (item === "html_message") {
        setValueHtmlMsg();
      }

      // setValue("in_reply_to", "");
      // setValue("from_email", "");
      setValue(
        "to",
        selectedData?.to ? selectedData?.to : playBookData?.work_email
      );
      setValue("scheduled_time", moment.utc().format("YYYY-MM-DD HH:mm:ss"));
      setValue("subject", selectedData?.subject);
    });
    setTimeout(() => {
      setIsLoading((prev: any) => ({
        ...prev,
        onPage: false,
        from_email: false,
        in_reply_to: false,
      }));
    });
  }, [selectedData]);

  useEffect(() => {
    setIsLoading((prev: any) => ({
      ...prev,
      in_reply_to: true,
    }));
    setValue(
      "in_reply_to",
      selectedData?.in_reply_to
        ? _.filter(emails, (o: any) => {
            o.value = o.id;
            return o?.in_reply_to === selectedData?.in_reply_to;
          })?.[0]
        : ""
    );
    setTimeout(() => {
      setIsLoading((prev: any) => ({
        ...prev,
        in_reply_to: false,
      }));
    }, 1000);
  }, [selectedData, selectedSequenceEvent, emails]);

  useEffect(() => {
    setIsLoading((prev: any) => ({
      ...prev,
      from_email: true,
    }));
    setValue(
      "from_email",
      selectedData?.from_email
        ? _.filter(mailAccountsData, (o: any) => {
            o.label = o.email;
            o.value = o.id;
            return o?.id === selectedData?.from_email;
          })?.[0]
        : ""
    );
    setTimeout(() => {
      setIsLoading((prev: any) => ({
        ...prev,
        from_email: false,
      }));
    }, 1000);
  }, [selectedData, selectedSequenceEvent, mailAccountsData]);

  const handleChangeFromEmail = (event: any) => {
    setValue("from_email", event);
    trigger("from_email");
    setCurrentSignature(event?.signature || "");
    setValueHtmlMsg(event?.signature || "", true);
  };

  const handleSendNow = async (id: any) => {
    try {
      let res = await sendEmailService(id, position);
      if (res?.data) {
        devLog(() => {
          console.log("res?.data", res?.data);
        });
        ToastSuccess("Email successfully sent.");
        setIsLoading((prev: any) => ({ ...prev, form: false }));
        removeBodyLoader();
        onLoadApi();
      }
    } catch (e: any) {
      ToastError("Something went wrong!");
      devLogError(() => {
        console.error(e?.response);
      });
      setIsLoading((prev: any) => ({ ...prev, form: false }));
      removeBodyLoader();
    }
  };

  const onSubmit = async (data: any) => {
    devLog(() => {
      console.log("onSubmit data", data);
    });
    setIsLoading((prev: any) => ({ ...prev, form: true }));
    insertBodyLoader();

    let _parentEmailMsg = data?.in_reply_to?.html_message || "";
    if (_parentEmailMsg) {
      _parentEmailMsg = _parentEmailMsg.replace(
        /<html>|<\/html>|<body>|<\/body>/gi,
        ""
      );
      _parentEmailMsg = `<br><blockquote style="margin: 0 0 0 0.8ex;border-left-width: 1px;border-left-style: solid;padding-left: 1ex;border-left-color: rgb(204,204,204);">${_parentEmailMsg}</blockquote>`;
    }

    try {
      let res = await createAsEmailService({
        ...data,
        in_reply_to: data?.in_reply_to?.id,
        from_email: data?.from_email?.id,
        position: position,
        html_message: `<html><body>${
          data?.html_message + _parentEmailMsg
        }</body></html>`,
      });
      if (res?.data?.id) {
        handleSendNow(res?.data?.id);
      } else {
        ToastError("Something went wrong!");
        setIsLoading((prev: any) => ({ ...prev, form: false }));
        removeBodyLoader();
        onLoadApi();
      }
    } catch (e: any) {
      ToastError("Something went wrong!");
      devLogError(() => {
        console.error(e?.response);
      });
      setIsLoading((prev: any) => ({ ...prev, form: false }));
      removeBodyLoader();
    }
  };

  const handleMyEditorOnChange = (value: string, editor: any) => {
    // value = `<html><body>${value}</body></html>`;
    setValue("html_message", value);
    // handleEditorPreview(value);
  };

  const handleChangeParentEmail = (event: any) => {
    setValue("in_reply_to", event);
    trigger("in_reply_to");

    devLog(() => {
      console.log("handleChangeParentEmail() event", event);
    });

    setIsLoading((prev: any) => ({ ...prev, from_email: true, subject: true }));
    if (event?.id) {
      devLog(() => {
        console.log("id", event?.id);
        console.log("from_email", event?.from_email);
        console.log("to", event?.to);
        console.log("subject", event?.subject);
      });
      setValue(
        "from_email",
        event?.from_email
          ? _.filter(mailAccountsData, (o: any) => {
              o.label = o.email;
              o.value = o.id;
              return o?.id === event?.from_email;
            })?.[0]
          : ""
      );

      //update signature
      if (event?.from_email) {
        let _mailAccount = _.filter(mailAccountsData, (o: any) => {
          o.label = o.email;
          o.value = o.id;
          return o?.id === event?.from_email;
        })?.[0];
        setCurrentSignature(_mailAccount?.signature || "");
        setValueHtmlMsg(_mailAccount?.signature || "", true);
      } else {
        setCurrentSignature("");
        setValueHtmlMsg("", true);
      }

      setValue("to", event?.to || getValues("to"));
      setValue("subject", "RE: " + (event?.subject || ""));
      setTimeout(() =>
        setIsLoading((prev: any) => ({
          ...prev,
          from_email: false,
          subject: false,
        }))
      );
    } else {
      setValue("from_email", "");

      //update signature
      setCurrentSignature("");
      setValueHtmlMsg("", true);

      setValue("to", playBookData?.work_email);
      setValue("subject", "");
      setTimeout(() =>
        setIsLoading((prev: any) => ({
          ...prev,
          from_email: false,
          subject: false,
        }))
      );
    }
  };

  const handleSaveDraft = () => {
    devLog(() => {
      console.log('getValues("in_reply_to")', getValues("in_reply_to"));
      console.log('getValues("from_email")', getValues("from_email"));
    });
    let _data = {
      in_reply_to: getValues("in_reply_to")?.id || null,
      from_email: getValues("from_email")?.id || null,
      to: getValues("to") || "",
      subject: getValues("subject") || "",
      html_message: getValues("html_message")
        ? getValues("html_message")?.replace(/\n/g, "")
        : "",
    };
    devLog(() => {
      console.log("selectedSequenceEvent", selectedSequenceEvent);
      console.log("selectedData", selectedData);
      console.log("playBookData", playBookData);
    });
    void updateProspectSequenceEvent(
      selectedSequenceEvent?.person,
      selectedData?.id,
      _data,
      onLoadApi
    );
  };

  const setValueHtmlMsg = (
    addSignature: string | null = "",
    isAddSignature: boolean = false
  ) => {
    // when you change the from_email field make sure that what you write in html_message must maintain
    if (selectedData?.text) {
      if (selectedData?.text && selectedData?.text?.toLowerCase() !== "none") {
        if (isAddSignature) {
          setValue(
            "html_message",
            getValues("html_message")?.replace(`${currentSignature}`, "") +
              addSignature
          );
        } else {
          setValue(
            "html_message",
            selectedData?.text?.replace(/\n/g, "<br />") + addSignature
          );
        }
      } else {
        if (isAddSignature) {
          setValue(
            "html_message",
            getValues("html_message")?.replace(`${currentSignature}`, "") +
              addSignature
          );
        } else {
          setValue("html_message", "" + addSignature);
        }
      }
    } else {
      if (
        selectedData?.html_message &&
        selectedData?.html_message?.toLowerCase() !== "none"
      ) {
        if (isAddSignature) {
          setValue(
            "html_message",
            getValues("html_message")?.replace(`${currentSignature}`, "") +
              addSignature
          );
        } else {
          setValue(
            "html_message",
            selectedData?.html_message?.replace(/\n/g, "<br />") + addSignature
          );
        }
      } else {
        if (isAddSignature) {
          setValue(
            "html_message",
            getValues("html_message")?.replace(`${currentSignature}`, "") +
              addSignature
          );
        } else {
          setValue("html_message", "" + addSignature);
        }
      }
    }
  };

  return (
    <>
      <div className={`send-container ${containers} xl:tw-py-5`}>
        <div className="tw-flex tw-flex-col tw-items-center lg:tw-flex-row lg:tw-justify-between">
          {/*left*/}
          <div className="tw-flex tw-justify-center tw-items-center">
            <LoadingButton
              type="button"
              variant="outlined"
              onClick={handleSubmit((data) => onSubmit(data))}
              className="tw-border tw-border-[#569ade] tw-flex tw-justify-around tw-items-center tw-py-2 sm:tw-py-3 lg:tw-px-5"
              loading={isLoading?.form}
              disabled={isLoading?.form}
            >
              <span className="tw-px-1.5 tw-text-xs tw-uppercase tw-font-medium">
                Send
              </span>{" "}
              <SendOutlinedIcon sx={{ fontSize: 20, color: "#3586d7" }} />
            </LoadingButton>
            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              className="tw-mx-4"
            />
            <SendLater
              useForm={{
                register,
                unregister,
                setValue,
                handleSubmit,
                reset,
                getValues,
                trigger,
                setError,
                errors,
              }}
              onLoadApi={onLoadApi}
              loading={isLoading?.form}
              disabled={isLoading?.form}
              position={position}
            />
          </div>
          {/*right*/}
          <div className="tw-py-2 tw-flex tw-space-x-2 lg:tw-space-x-1">
            {/*<Button onClick={() => null} className="tw-min-w-min">
              <IconTrash
                strokeWidth={3}
                size={18}
                style={{ color: "#778da9" }}
              />
            </Button>*/}
            {selectedData?.id && (
              <LoadingButton
                type="button"
                variant="outlined"
                onClick={handleSaveDraft}
                className="tw-border tw-border-[#569ade] tw-flex tw-justify-around tw-items-center tw-py-2 sm:tw-py-3 lg:tw-px-1"
                loading={false}
                disabled={false}
              >
                <span className="tw-px-1.5 tw-text-xs tw-font-medium">
                  Save Draft
                </span>
              </LoadingButton>
            )}
            <LoadingButton
              type="button"
              variant="outlined"
              onClick={() => regeneratePlaybook(selectedSequenceEvent)}
              className="tw-border tw-border-[#569ade] tw-flex tw-justify-around tw-items-center tw-py-2 sm:tw-py-3 lg:tw-px-1"
              loading={false}
              disabled={false}
            >
              <span className="tw-px-1.5 tw-text-xs tw-font-medium">
                Regenerate
              </span>
            </LoadingButton>
          </div>
        </div>
      </div>
      <div className={`parent-email-container ${containers}`}>
        <div className="tw-flex">
          <div className={`${label}`}>Parent Email</div>
          <div className={`${labelValue}`}>
            {!isLoading?.in_reply_to && (
              <ReactSelect
                name="in_reply_to"
                className="basic-single tw-cursor-pointer"
                variant="blue"
                placeholder="Please select"
                isClearable={true}
                isSearchable={true}
                options={emails.map((item: any, idx: number) => {
                  let _count = item?.subject ? "" : ++countIndexForEmailSubject;
                  item.label = `ID: ${item?.id} | Subject: ${
                    item?.subject ? item?.subject : "Email " + _count
                  }`;
                  item.value = item.id;
                  return item;
                })}
                styles={selectBlueStyles}
                defaultValue={getValues("in_reply_to")}
                onChange={handleChangeParentEmail}
              />
            )}
            <ErrorMessage
              errors={errors}
              name="in_reply_to"
              render={({ message }) => (
                <FormHelperText sx={{ color: "error.main" }}>
                  {message}
                </FormHelperText>
              )}
            />
          </div>
        </div>
      </div>
      <div className={`from-container ${containers}`}>
        <div className="tw-flex">
          <div className={`${label}`}>From</div>
          <div className={`${labelValue}`}>
            {!isLoading?.from_email && (
              <ReactSelect
                name="from"
                className="basic-single tw-cursor-pointer"
                variant="blue"
                placeholder="Please select"
                isClearable={false}
                isSearchable={true}
                options={mailAccountsData.map((item: any, idx: number) => {
                  item.label = item.email;
                  item.value = item.id;
                  return item;
                })}
                styles={selectBlueStyles}
                defaultValue={getValues("from_email")}
                onChange={handleChangeFromEmail}
              />
            )}
            <ErrorMessage
              errors={errors}
              name="from_email"
              render={({ message }) => (
                <FormHelperText sx={{ color: "error.main" }}>
                  {message}
                </FormHelperText>
              )}
            />
          </div>
        </div>
      </div>
      <div className={`to-container ${containers}`}>
        <div className="tw-flex">
          <div className={`${label}`}>To</div>
          <div className={`${labelValue}`}>
            {!isLoading?.onPage && (
              <input
                type="text"
                defaultValue={playBookData?.work_email}
                className={`${labelValueInput}`}
                {...register("to", {
                  required: "This is required field.",
                  pattern: emailAddressPattern,
                })}
              />
            )}
            <ErrorMessage
              errors={errors}
              name="to"
              render={({ message }) => (
                <FormHelperText sx={{ color: "error.main" }}>
                  {message}
                </FormHelperText>
              )}
            />
          </div>
        </div>
      </div>
      <div className={`subject-container ${containers}`}>
        <div className="tw-flex">
          <div className={`${label}`}>Subject</div>
          <div className={`${labelValue}`}>
            {!isLoading?.subject && (
              <input
                type="text"
                className={`${labelValueInput}`}
                {...register("subject", {
                  required: "This is required field.",
                })}
              />
            )}
            <ErrorMessage
              errors={errors}
              name="subject"
              render={({ message }) => (
                <FormHelperText sx={{ color: "error.main" }}>
                  {message}
                </FormHelperText>
              )}
            />
          </div>
        </div>
      </div>
      <div className={`message-container tw-p-0 xl:tw-p-0`}>
        <div className="">
          <MyEditor
            initialValue={getValues("html_message")}
            onEditorChange={(value: string, editor: any) => {
              handleMyEditorOnChange(value, editor);
            }}
            // isPreformatted={true}
            onFocus={(e: any) => null}
          />

          <ErrorMessage
            errors={errors}
            name="html_message"
            render={({ message }) => (
              <FormHelperText sx={{ color: "error.main" }}>
                {message}
              </FormHelperText>
            )}
          />
        </div>
      </div>
    </>
  );
};

const selectBlueStyles = {
  control: (styles: any) => ({
    ...styles,
    display: "flex",
    backgroundColor: "transparent",
    boxShadow: "none",
    border: "1px solid transparent", //"1px solid #1a76d2",
    cursor: "pointer",
    justifyContent: "start",
    alignItems: "start",
    minHeight: 0,
    borderRadius: 0,
    transitionProperty: "all",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    transitionDuration: "500ms",
    "&:hover": {
      borderColor: "transparent",
    },
    "&.select__control--menu-is-open": {
      borderBottom: "1px solid #1a76d2",
    },
  }),
  option: (styles: any, { data, isDisabled, isFocused, isSelected }: any) => {
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? "#1a76d2"
        : isFocused
        ? "white"
        : undefined,
      color: isDisabled
        ? "#ccc"
        : isSelected
        ? "white"
        : isFocused
        ? "#0253ad"
        : "#3486d7",
      cursor: isDisabled ? "not-allowed" : "pointer",
      padding: "8px 18px",
      fontWeight: 400,
      fontSize: "0.83rem",

      ":active": {
        ...styles[":active"],
        backgroundColor: !isDisabled ? data.color : undefined,
      },
    };
  },
  menu: (styles: any, { isLoading, placement, children }: any) => ({
    ...styles,
    border: "1px solid #74ace4",
    boxShadow: "none",
    borderRadius: 7,
    background: "#f8fbff",
    zIndex: 9,
    position: "relative",
  }),
  menuList: (styles: any) => ({
    ...styles,
    paddingTop: 10,
    paddingBottom: 10,
  }),
  input: (styles: any) => ({ ...styles, color: "#889bb3" }),
  placeholder: (styles: any) => ({
    ...styles,
    color: "#889bb3",
    fontSize: "0.875rem",
    fontWeight: 400,
  }),
  valueContainer: (styles: any) => ({
    ...styles,
    padding: 0,
    display: "flex",
  }),
  singleValue: (styles: any, { data }: any) => ({
    ...styles,
    color: "#889bb3",
  }),
  clearIndicator: (styles: any) => ({ ...styles, padding: 0 }),
  indicatorSeparator: (
    styles: any,
    { isDisabled, isFocused, innerProps }: any
  ) => ({ ...styles, display: "none" }),
  dropdownIndicator: (styles: any) => ({
    ...styles,
    display: "none",
    color: "#889bb3",
    ":hover": {
      color: "#889bb3",
    },
    svg: {
      width: 16,
    },
  }),
};

const containers =
  "tw-px-2 tw-py-2 tw-border-b tw-border-[#f2f3f9] xl:tw-px-10 xl:tw-py-3";
const label =
  "tw-w-4/12 tw-font-light tw-text-[#889bb3] lg:tw-w-3/12 xl:tw-w-2/12 2xl:tw-w-1/12 tw-flex tw-items-center";
const labelValue =
  "tw-w-8/12 tw-font-normal tw-text-[#889bb3] tw-truncate lg:tw-w-9/12 xl:tw-w-10/12 2xl:tw-w-11/12 2xl:tw-pl-4";
const labelValueInput =
  "tw-w-full tw-outline-none tw-border-b tw-border-transparent tw-transition-all tw-duration-500 focus:tw-border-b focus:tw-border-[#569ade]";

export default DraftEmail;
