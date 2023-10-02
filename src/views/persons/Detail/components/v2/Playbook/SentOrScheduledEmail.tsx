import { useLayoutEffect, useState } from "react";
import { Tooltip } from "@mui/material";
import { IconTrash } from "@tabler/icons-react";
import moment from "moment-timezone";
import xss from "xss";
import { ReactComponent as UserIcon } from "../../../../../../assets/images/svg/user.svg";
import { devLogError } from "../../../../../../helpers/logs";
import { useEmailsTab } from "../../../../../../hooks/persons/useEmailsTab";
import { getMailAccountDetailService } from "../../../../../../services/mail-accounts.service";
import DeletePersonEmail from "../../../../../../ui-component/buttons/DeletePersonEmail";
import DeleteProspectSequence from "src/ui-component/buttons/DeleteProspectSequence";

import { ClickTrackDataTypes } from "src/types/person";

type SentOrScheduledEmailTypes = {
  onLoadApi: any;
  selectedData: any;
  position: any;
  selectedSequenceEvent: any;
};

const SentOrScheduledEmail = ({
  position,
  onLoadApi,
  selectedData,
  selectedSequenceEvent,
}: SentOrScheduledEmailTypes) => {
  const [fromEmailDetail, setFromEmailDetail] = useState<any>(null);
  let { id: personId } = useEmailsTab(false);
  const [timezone, setTimezone] = useState<any>(moment.tz.guess());
  let { showStatus } = useEmailsTab(false);

  useLayoutEffect(() => {
    GetFromEmailDetail();
    renderMessage();
  }, [selectedData]);

  const GetFromEmailDetail = async () => {
    try {
      let response = await getMailAccountDetailService(
        selectedData?.from_email
      );
      if (response?.data) {
        setFromEmailDetail(response?.data);
      }
    } catch (e: any) {
      devLogError(() => {
        console.error(e?.response);
      });
    }
  };

  const renderMessage = () => {
    let _preview: any = document.querySelector(`.render_message`);
    let _htmlMsg = selectedData?.html_message;
    if (_htmlMsg) {
      _htmlMsg = _htmlMsg.replace(/\n/g, "");
      _htmlMsg = _htmlMsg.replace(/<html>|<\/html>|<body>|<\/body>/gi, "");
    }
    if (_preview && _htmlMsg) {
      _preview.innerHTML = xss(_htmlMsg, {
        onIgnoreTagAttr: function (tag, name, value, isWhiteAttr) {
          if (name === "style") {
            // escape its value using built-in escapeAttrValue function
            // @ts-ignore
            return name + '="' + xss.escapeAttrValue(value) + '"';
          }
        },
      });
    }
  };
  console.log({ selectedData });
  return (
    <>
      <div
        className={`name-email-container tw-py-2 tw-border-b tw-border-[#f2f3f9] ${containers} xl:tw-py-5`}
      >
        <div className="tw-flex tw-flex-col tw-items-center sm:tw-flex-row sm:tw-justify-between">
          {/*left*/}
          <div className="tw-flex tw-justify-center tw-items-center">
            <div className="tw-flex tw-items-center tw-justify-start tw-gap-2 tw-text-inherit tw-text-[0.75rem] tw-leading-4 tw-no-underline hover:tw-bg-transparent text">
              <div className="tw-relative tw-flex tw-items-center tw-justify-center tw-w-9 tw-h-9 tw-overflow-hidden tw-bg-gray-100 tw-rounded-full">
                <UserIcon className="tw-absolute tw-w-7 tw-h-7 tw-text-gray-400" />
              </div>
              <div className="tw-pl-1.5">
                <div className="tw-text-xs tw-text-[#99a9be] tw-font-medium">
                  <strong>Status:&nbsp;</strong>{" "}
                  {selectedData?.status !== null ? (
                    showStatus(selectedData?.status)
                  ) : (
                    <hr className="tw-w-3 tw-border-black tw-inline-block tw-ml-3" />
                  )}
                </div>
                <div className="tw-text-xs tw-text-[#99a9be] tw-font-medium">
                  To: {selectedData?.to}
                </div>
                <div className="tw-text-xs tw-text-[#99a9be] tw-font-medium">
                  Opened: {selectedData?.trackings?.opened ? "Yes" : "No"}
                </div>
                <div className="tw-text-xs tw-text-[#99a9be] tw-font-medium">
                  <strong>Click Stats:&nbsp;</strong>{" "}
                  {selectedData?.click_tracking?.map(
                    (data: ClickTrackDataTypes, index: number) => (
                      <div className="tw-ml-2" key={index}>
                        <span>Clicks: {data.click_count} &nbsp;</span>

                        <a href="{data.url}" target="__blank">
                          Link: {data.url}
                        </a>
                      </div>
                    )
                  )}
                </div>
                {selectedData?.click_tracking?.map(
                  (data: ClickTrackDataTypes, index: number) => (
                    <div className="tw-ml-2" key={index}>
                      <span>Clicks: {data.click_count} &nbsp;</span>

                      <a href="{data.url}" target="__blank">
                        Link: {data.url}
                      </a>
                    </div>
                  )
                )}

                <div className="tw-text-xs tw-text-[#99a9be] tw-font-medium">
                  Position: {selectedData?.position}
                </div>
              </div>
            </div>
          </div>
          {/*right*/}
          <div>
            <DeleteProspectSequence
              id={selectedSequenceEvent?.id}
              personId={Number(personId)}
              onLoadApi={onLoadApi}
              variant="text"
              color="inherit"
              className="tw-min-w-min"
            >
              <IconTrash
                strokeWidth={3}
                size={18}
                style={{ color: "#778da9" }}
              />
            </DeleteProspectSequence>
          </div>
        </div>
      </div>
      <div className={`date-container ${containers} tw-pt-6`}>
        <span className="tw-text-xs tw-text-[#99a9be] tw-tracking-[-0.5px]">
          <Tooltip title="Scheduled Time">
            <span>
              {moment(selectedData?.scheduled_time).tz(timezone).format("lll")}
            </span>
          </Tooltip>
        </span>
      </div>
      <div className={`subject-container ${containers}`}>
        <h3 className="tw-text-black tw-text-lg tw-font-semibold tw-pb-5 xl:tw-text-[1.4rem]">
          {selectedData?.subject}
        </h3>
      </div>
      <div
        className={`message-container ${containers} tw-text-[14px] tw-text-black tw-font-normal render_message`}
      />
    </>
  );
};

const containers = "tw-px-2 xl:tw-px-10";

export default SentOrScheduledEmail;
