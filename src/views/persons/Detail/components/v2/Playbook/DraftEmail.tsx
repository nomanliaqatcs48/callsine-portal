import { Box, Divider, FormHelperText } from "@mui/material";
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
import {
  selectBlueStyles,
  _styles,
} from "../../../../../../utils/people/utils";
import { GrammarlyEditorPlugin } from "@grammarly/editor-sdk-react";

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
  const [isSubjectDisabled, setIsSubjectDisabled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<any>({
    onPage: true,
    form: false,
    in_reply_to: false,
    from_email: false,
    subject: false,
  });
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

  useEffect(() => {
    setIsLoading((prev: any) => ({
      ...prev,
      from_email: true,
      in_reply_to: true,
    }));
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
      setValue(
        "subject",
        selectedData?.subject
          ? selectedData?.subject?.includes("Subject Line: ")
            ? selectedData?.subject?.replace(/Subject Line: /gi, "")
            : selectedData?.subject
          : ""
      );
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

    // update parent email html message rich editor
    if (selectedData?.in_reply_to) {
      let _html_message =
        _.filter(emails, (o: any) => {
          o.value = o.id;
          return o?.in_reply_to === selectedData?.in_reply_to;
        })?.[0] || "";
      let _mailAccount =
        _.filter(mailAccountsData, (o: any) => {
          o.label = o.email;
          o.value = o.id;
          return o?.id === selectedData?.from_email;
        })?.[0] || "";
      let _formatParentEmailMsg =
        _html_message?.html_message?.replace(
          /<html>|<\/html>|<body>|<\/body>/gi,
          ""
        ) || "";
      _formatParentEmailMsg = _formatParentEmailMsg
        ? `<div>From: ${_mailAccount?.first_name} ${_mailAccount?.last_name} (${
            _mailAccount?.email
          })</div><div>Scheduled Time: ${
            _html_message?.scheduled_time
              ? moment(_html_message?.scheduled_time).format("lll")
              : ""
          }</div><div>To: ${
            _html_message?.to
          }</div><br/>${_formatParentEmailMsg}`
        : "";
      _formatParentEmailMsg = `<br /><blockquote style="margin: 0 0 0 0.8ex;border-left-width: 1px;border-left-style: solid;padding-left: 1ex;border-left-color: rgb(204,204,204);">${_formatParentEmailMsg}</blockquote>`;
      setValue("parent_email_html_message", _formatParentEmailMsg);
    } else {
      setValue("parent_email_html_message", "");
    }
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

    // update signature
    if (selectedData?.from_email) {
      let _mailAccount = _.filter(mailAccountsData, (o: any) => {
        o.label = o.email;
        o.value = o.id;
        return o?.id === selectedData?.from_email;
      })?.[0];
      setValue("signature", _mailAccount?.signature || "");
    } else {
      setValue("signature", "");
    }
    setTimeout(() => {
      setIsLoading((prev: any) => ({
        ...prev,
        from_email: false,
      }));
    }, 1000);
  }, [selectedData, selectedSequenceEvent, mailAccountsData]);

  useEffect(() => {
    if (errors && Object.keys(errors)?.length > 0) {
      if (Object.keys(errors)?.[0] === "html_message") {
        ToastError("Email message is required.");
      }
    }
  });

  const handleChangeFromEmail = (event: any) => {
    setValue("from_email", event);
    trigger("from_email");
    // setCurrentSignature(event?.signature || "");
    // setValueHtmlMsg(event?.signature || "", true);
    setValue("signature", event?.signature || "");
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

    try {
      let res = await createAsEmailService({
        ...data,
        in_reply_to: data?.in_reply_to?.id,
        from_email: data?.from_email?.id,
        position: position,
        html_message: `<html><body>${
          data?.html_message +
          data?.signature.replace(/\n/g, "") +
          data?.parent_email_html_message.replace(/\n/g, "")
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
    setValue("html_message", value);
  };

  const handleSignatureOnChange = (value: string, editor: any) => {
    setValue("signature", value);
  };

  const handleParentEmailHtmlMsgOnChange = (value: string, editor: any) => {
    setValue("parent_email_html_message", value);
  };

  const handleChangeParentEmail = (event: any) => {
    setValue("in_reply_to", event);
    trigger("in_reply_to");

    devLog(() => {
      console.log("handleChangeParentEmail() event", event);
    });

    setIsLoading((prev: any) => ({ ...prev, from_email: true, subject: true }));
    if (event?.id) {
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
        // setCurrentSignature(_mailAccount?.signature || "");
        // setValueHtmlMsg(_mailAccount?.signature || "", true);
        setValue("signature", _mailAccount?.signature || "");
      } else {
        // setCurrentSignature("");
        // setValueHtmlMsg("", true);
        setValue("signature", "");
      }

      // update parent email html message rich editor
      if (event?.in_reply_to) {
        let _html_message =
          _.filter(emails, (o: any) => {
            o.value = o.id;
            return o?.in_reply_to === event?.in_reply_to;
          })?.[0] || "";
        let _mailAccount =
          _.filter(mailAccountsData, (o: any) => {
            o.label = o.email;
            o.value = o.id;
            return o?.id === event?.from_email;
          })?.[0] || "";
        let _formatParentEmailMsg =
          _html_message?.html_message?.replace(
            /<html>|<\/html>|<body>|<\/body>/gi,
            ""
          ) || "";
        _formatParentEmailMsg = _formatParentEmailMsg
          ? `<div>From: ${_mailAccount?.first_name} ${
              _mailAccount?.last_name
            } (${_mailAccount?.email})</div><div>Scheduled Time: ${
              _html_message?.scheduled_time
                ? moment(_html_message?.scheduled_time).format("lll")
                : ""
            }</div><div>To: ${
              _html_message?.to
            }</div><br/>${_formatParentEmailMsg}`
          : "";
        _formatParentEmailMsg = `<br /><blockquote style="margin: 0 0 0 0.8ex;border-left-width: 1px;border-left-style: solid;padding-left: 1ex;border-left-color: rgb(204,204,204);">${_formatParentEmailMsg}</blockquote>`;
        setValue("parent_email_html_message", _formatParentEmailMsg);
      } else if (event?.status === 0 && event?.scheduled_time) {
        // if status is 0 and scheduled_time is not null
        let _mailAccount =
          _.filter(mailAccountsData, (o: any) => {
            o.label = o.email;
            o.value = o.id;
            return o?.id === event?.from_email;
          })?.[0] || "";
        let _formatParentEmailMsg =
          event?.html_message?.replace(
            /<html>|<\/html>|<body>|<\/body>/gi,
            ""
          ) || "";
        _formatParentEmailMsg = _formatParentEmailMsg
          ? `<div>From: ${_mailAccount?.first_name} ${
              _mailAccount?.last_name
            } (${_mailAccount?.email})</div><div>Scheduled Time: ${
              event?.scheduled_time
                ? moment(event?.scheduled_time).format("lll")
                : ""
            }</div><div>To: ${event?.to}</div><br/>${_formatParentEmailMsg}`
          : "";
        _formatParentEmailMsg = `<br /><blockquote style="margin: 0 0 0 0.8ex;border-left-width: 1px;border-left-style: solid;padding-left: 1ex;border-left-color: rgb(204,204,204);">${_formatParentEmailMsg}</blockquote>`;
        setValue("parent_email_html_message", _formatParentEmailMsg);
      } else {
        setValue("parent_email_html_message", "");
      }

      setValue("to", event?.to || getValues("to"));

      // for subject
      let _eventSubject = event?.subject || "";
      if (_eventSubject) {
        if (_eventSubject?.includes("RE: ")) {
          _eventSubject = "RE: " + _eventSubject.replace(/RE: /gi, "");
        } else {
          _eventSubject = "RE: " + _eventSubject;
        }

        if (_eventSubject?.includes("Subject Line: ")) {
          _eventSubject = _eventSubject.replace(/Subject Line: /gi, "");
        }
      }
      setValue("subject", _eventSubject);
      setIsSubjectDisabled(true);

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
      // setCurrentSignature("");
      // setValueHtmlMsg("", true);

      setValue("to", playBookData?.work_email);
      setValue(
        "subject",
        selectedData?.subject
          ? selectedData?.subject?.includes("Subject Line: ")
            ? selectedData?.subject?.replace(/Subject Line: /gi, "")
            : selectedData?.subject
          : ""
      );
      setIsSubjectDisabled(false);
      setValue("signature", "");
      setValue("parent_email_html_message", "");
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
    let _data = {
      in_reply_to: getValues("in_reply_to")?.id || null,
      from_email: getValues("from_email")?.id || null,
      to: getValues("to") || "",
      subject: getValues("subject") || "",
      html_message: getValues("html_message")?.replace(/\n/g, ""),
    };
    void updateProspectSequenceEvent(
      selectedSequenceEvent?.person,
      selectedData?.id,
      _data,
      onLoadApi
    );
  };

  const setValueHtmlMsg = () => {
    if (selectedData?.text) {
      if (selectedData?.text && selectedData?.text?.toLowerCase() !== "none") {
        setValue("html_message", selectedData?.text?.replace(/\n/g, "<br />"));
      } else {
        setValue("html_message", "");
      }
    } else {
      if (
        selectedData?.html_message &&
        selectedData?.html_message?.toLowerCase() !== "none"
      ) {
        setValue(
          "html_message",
          selectedData?.html_message?.replace(/\n/g, "<br />")
        );
      } else {
        setValue("html_message", "");
      }
    }
  };

  return (
    <>
      <div className={`send-container ${_styles?.containers} xl:tw-py-5`}>
        <div className="tw-flex tw-flex-col tw-items-center lg:tw-flex-row lg:tw-justify-between">
          {/*left*/}
          <div className="tw-flex tw-justify-center tw-items-center">
            <LoadingButton
              type="button"
              variant="outlined"
              onClick={handleSubmit((data) => onSubmit(data))}
              className="tw-border tw-border-[#1976d2] tw-flex tw-justify-around tw-items-center tw-py-2 sm:tw-py-3 lg:tw-px-5"
              loading={isLoading?.form}
              disabled={isLoading?.form}
            >
              <span className="tw-px-1.5 tw-text-primary tw-text-xs tw-uppercase tw-font-medium">
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
                <span className="tw-px-1.5 tw-text-xs tw-font-normal tw-text-callsineGray">
                  Save Draft
                </span>
              </LoadingButton>
            )}
            <LoadingButton
              type="button"
              variant="outlined"
              onClick={() =>
                regeneratePlaybook(selectedSequenceEvent, onLoadApi)
              }
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
      <div className={`parent-email-container ${_styles?.containers}`}>
        <div className="tw-flex">
          <div className={`${_styles?.label}`}>Parent Email</div>
          <div className={`${_styles?.labelValue}`}>
            {!isLoading?.in_reply_to && (
              <ReactSelect
                name="in_reply_to"
                className="basic-single tw-cursor-pointer"
                variant="blue"
                placeholder="Please select"
                isClearable={true}
                isSearchable={true}
                options={emails
                  .map((item: any, idx: number) => {
                    let _count = item?.subject
                      ? ""
                      : ++countIndexForEmailSubject;
                    item.label = `ID: ${item?.id} | ${
                      item?.subject ? item?.subject : "Email " + _count
                    }`;

                    if (item?.label?.includes("Subject Line: ")) {
                      item.label = item.label.replace(/Subject Line: /gi, "");
                    }

                    if (item?.position !== null) {
                      item.label = `${item.label} (${item.position})`;
                    }

                    item.value = item.id;
                    return item;
                  })
                  .filter((item: any, idx: number) => {
                    return item?.scheduled_time;
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
      <div className={`from-container ${_styles?.containers}`}>
        <div className="tw-flex">
          <div className={`${_styles?.label}`}>From</div>
          <div className={`${_styles?.labelValue}`}>
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
      <div className={`to-container ${_styles?.containers}`}>
        <div className="tw-flex">
          <div className={`${_styles?.label}`}>To</div>
          <div className={`${_styles?.labelValue}`}>
            {!isLoading?.onPage && (
              <input
                type="text"
                defaultValue={playBookData?.work_email}
                className={`${_styles?.labelValueInput}`}
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
      <div className={`subject-container ${_styles?.containers}`}>
        <div className="tw-flex">
          <div className={`${_styles?.label}`}>Subject</div>
          <div className={`${_styles?.labelValue}`}>
            {!isLoading?.subject && (
              <GrammarlyEditorPlugin clientId="client_XceQ4Hc6Jw4SS4kSvkSWVx">
                <input
                  type="text"
                  className={`${_styles?.labelValueInput}`}
                  {...register("subject", {
                    required: "This is required field.",
                  })}
                  disabled={isSubjectDisabled}
                />
              </GrammarlyEditorPlugin>
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
      <div className={`signature-container tw-px-3 tw-py-4`}>
        <Box
          className={`tw-text-black tw-font-semibold tw-mb-1 ${_styles?.label} tw-w-auto xl:tw-w-auto 2xl:tw-w-auto`}
        >
          Signature
        </Box>
        <div className="">
          <MyEditor
            initialValue={getValues("signature")}
            onEditorChange={(value: string, editor: any) => {
              handleSignatureOnChange(value, editor);
            }}
            onFocus={(e: any) => null}
            disabled
            init={{
              height: 150,
              menubar: false,
              plugins: [],
              selector: "textarea",
              toolbar: false,
              statusbar: false,
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px } pre {font-family:Helvetica,Arial,sans-serif;}",
            }}
          />
        </div>
      </div>
      <div className={`parent-email-thread-container tw-px-3 tw-py-4`}>
        <Box
          className={`tw-text-black tw-font-semibold tw-mb-1 ${_styles?.label} tw-w-auto xl:tw-w-auto 2xl:tw-w-auto`}
        >
          Parent Email Thread
        </Box>
        <div className="">
          <MyEditor
            initialValue={getValues("parent_email_html_message")}
            onEditorChange={(value: string, editor: any) => {
              handleParentEmailHtmlMsgOnChange(value, editor);
            }}
            onFocus={(e: any) => null}
            editorHeight={400}
            disabled
            init={{
              height: 400,
              menubar: false,
              plugins: [],
              selector: "textarea",
              toolbar: false,
              statusbar: false,
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px } pre {font-family:Helvetica,Arial,sans-serif;}",
            }}
          />
        </div>
      </div>
    </>
  );
};

export default DraftEmail;
