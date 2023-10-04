import React, { useState } from "react";
import SentOrScheduledEmail from "./SentOrScheduledEmail";

import { useDispatch, useSelector } from "react-redux";
import { setShowDraft } from "src/store/playbooks/showDraftSlice";
import { RootState } from "src/store";

import DraftEmail from "./DraftEmail";
import _ from "lodash";
import { LoadingButton } from "@mui/lab";

const EditTypeHandler: React.FC<any> = ({
  selectedData,
  selectedIndex,
  selectedSequenceEvent,
  playBookData,
  personData,
  getPersonDetail,
}: any) => {
  const commonProps = {
    position: selectedIndex + 1,
    onLoadApi: () => {
      getPersonDetail();
      // setSelectedData(null);
      // setSelectedIndex(null);
    },
    selectedData,
    selectedSequenceEvent,
  };

  const dispatch = useDispatch();
  const showDraft = useSelector((state: RootState) => state.showDraft.value);
  const showDraftFn = () => dispatch(setShowDraft(true));

  return (
    <>
      {showDraft ? (
        <DraftEmail
          {...commonProps}
          playBookData={playBookData}
          personData={personData}
        />
      ) : _.includes([0, 1, 2, 3], selectedData?.status) ? (
        <>
          {/* <LoadingButton
            type="button"
            variant="outlined"
            onClick={() => dispatch(setShowDraft(true))}
            className="tw-border tw-border-[#569ade] tw-flex tw-justify-around tw-items-center tw-py-2 sm:tw-py-3 lg:tw-px-1"
            loading={false}
            disabled={false}
          >
            <span className="tw-px-1.5 tw-text-xs tw-font-medium lg:tw-text-[16px] lg:tw-tracking-[0.32px]">
              Edit
            </span>
          </LoadingButton> */}

          <SentOrScheduledEmail {...commonProps} showDraftFn={showDraftFn} />
        </>
      ) : (
        <DraftEmail
          {...commonProps}
          playBookData={playBookData}
          personData={personData}
        />
      )}
    </>
  );
};

export default EditTypeHandler;
