import { Button, Dialog, DialogContent } from "@mui/material";
import { useEffect, useState } from "react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  isSuccess: boolean;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  message,
  isSuccess,
}) => {
  
  const [teamId, setTeamId] = useState(null)
  useEffect(() => {
    let profile: any = localStorage.getItem("profile");
    profile = JSON.parse(profile);
    setTeamId(profile?.team || null)
  },[])
  
  if (!isOpen) return null;
  
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="default-modal-label"
      aria-describedby="default-modal-description"
    >
      <DialogContent>
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="tw-flex tw-justify-between tw-flex-row items-center mb-4">
              <h4 className="text-lg font-semibold">
                {isSuccess ? "Success" : "Error"}
              </h4>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            <div className="mb-4 tw-mt-5">
              <p className="text-gray-700">{message}</p>
            </div>
            {isSuccess && !teamId &&(
              <div className="mb-4 tw-mt-5">
                <p className="text-gray-700">
                  Time to onboard using our magic wizard!
                </p>
              </div>
            )}
            <div className="tw-flex tw-justify-end tw-mt-5">
              <Button
                onClick={() => {
                  if (isSuccess) {
                    if(teamId){
                      window.location.href = "/people";
                    } else {
                    window.location.href = "/wizard/campaign";
                    }
                  } else {
                    onClose();
                  }
                }}
                className="px-4 py-2 tw-bg-blue-600 tw-text-white rounded-md"
              >
                {isSuccess ? teamId ? "Go to people" : "Take Me There" : "Go Back"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessModal;
