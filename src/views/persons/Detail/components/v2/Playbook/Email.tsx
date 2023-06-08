import { IconTrash } from "@tabler/icons-react";
import moment from "moment";
import { useLayoutEffect, useState } from "react";
import xss from "xss";
import { ReactComponent as UserIcon } from "../../../../../../assets/images/svg/user.svg";
import { devLogError } from "../../../../../../helpers/logs";
import { useEmailsTab } from "../../../../../../hooks/persons/useEmailsTab";
import { getMailAccountDetailService } from "../../../../../../services/mail-accounts.service";
import DeletePersonEmail from "../../../../../../ui-component/buttons/DeletePersonEmail";

type EmailTypes = {
  onLoadApi: any;
  selectedData: any;
  position: any;
};

const Email = ({ position, onLoadApi, selectedData }: EmailTypes) => {
  const [fromEmailDetail, setFromEmailDetail] = useState<any>(null);
  let { id: personId } = useEmailsTab(false);

  useLayoutEffect(() => {
    GetFromEmailDetail();
    renderMessage();
  }, []);

  const GetFromEmailDetail = async () => {
    try {
      let response = await getMailAccountDetailService(
        selectedData?.from_email
      );
      if (response?.data) {
        setFromEmailDetail(response?.data);
      }
    } catch ({ response }) {
      devLogError(response);
    }
  };

  const renderMessage = () => {
    let _preview: any = document.querySelector(`.render_message`);
    let _htmlMsg = selectedData?.html_message;
    if (_htmlMsg) {
      _htmlMsg = _htmlMsg.replace(/\n/g, "<br />");
      _htmlMsg = _htmlMsg.replace(/<html>|<\/html>|<body>|<\/body>/gi, "");
    }
    if (_preview && _htmlMsg) {
      _preview.innerHTML = xss(_htmlMsg);
    }
  };

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
                <div className="tw-text-black tw-text-[0.9rem] tw-font-medium">
                  From: {fromEmailDetail?.first_name}{" "}
                  {fromEmailDetail?.last_name}
                </div>
                <div className="tw-text-xs tw-text-[#99a9be] tw-font-medium">
                  To: {selectedData?.to}
                </div>
              </div>
            </div>
          </div>
          {/*right*/}
          <div>
            <DeletePersonEmail
              id={selectedData?.id}
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
            </DeletePersonEmail>
          </div>
        </div>
      </div>
      <div className={`date-container ${containers} tw-pt-6`}>
        <span className="tw-text-xs tw-text-[#99a9be] tw-tracking-[-0.5px]">
          <div>{moment(selectedData?.scheduled_time).format("lll")}</div>
        </span>
      </div>
      <div className={`subject-container ${containers}`}>
        <h3 className="tw-text-black tw-text-lg tw-font-semibold tw-pb-5 xl:tw-text-[1.4rem]">
          {selectedData?.subject}
        </h3>
      </div>
      <div
        className={`message-container ${containers} tw-text-[0.875rem] render_message`}
      />
    </>
  );
};

const containers = "tw-px-2 xl:tw-px-10";

export default Email;
