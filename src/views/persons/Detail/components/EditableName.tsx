import React from "react";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import { useMutation } from "@tanstack/react-query";
import { patchPersonDetailService } from "src/services/persons.service";

interface EditableNameProps {
  data: any;
  editMode: boolean;
}

const EditableName: React.FC<EditableNameProps> = ({ data, editMode }) => {
  const { mutate, isLoading: isSaving } = useMutation({
    mutationFn: (data: { personId: number; payload: any }) => {
      return patchPersonDetailService(data.personId, data.payload);
    },
  });

  const [firstName, setFirstName] = React.useState<string | null>(null);

  const [lastName, setLastName] = React.useState<string | null>(null);

  const given = React.useMemo(() => {
    return firstName !== null ? firstName : data?.first_name;
  }, [data?.first_name, firstName]);

  const surname = React.useMemo(() => {
    return lastName !== null ? lastName : data?.last_name;
  }, [data?.last_name, lastName]);

  const handleOnSave = () => {
    mutate({
      personId: data.id,
      payload: {
        first_name: given,
        last_name: surname,
      },
    });
  };

  return (
    <>
      <input
        className="tw-w-[300px] tw-h-[40px] tw-border-2 tw-border-solid tw-border-[#E0E0E0] tw-rounded-md tw-py-1 tw-px-3 tw-text-[16px] tw-tracking-[0.32px] tw-text-black focus:tw-outline-none"
        value={given}
        onChange={(e) => {
          e.preventDefault();
          setFirstName(e.target.value);
        }}
        placeholder="First Name"
      />
      <div className="tw-h-[10px]" />
      <input
        className="tw-w-[300px] tw-h-[40px] tw-border-2 tw-border-solid tw-border-[#E0E0E0] tw-rounded-md tw-py-1 tw-px-3 tw-text-[16px] tw-tracking-[0.32px] tw-text-black focus:tw-outline-none"
        value={surname}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Last Name"
      />
      <LoadingButton
        loading={isSaving}
        startIcon={<SaveIcon />}
        onClick={(e) => {
          e.preventDefault();
          handleOnSave();
        }}
      >
        Save
      </LoadingButton>
    </>
  );
};

export default EditableName;
