import { ErrorMessage } from "@hookform/error-message";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  Grid,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { devLog, devLogError } from "../../helpers/logs";
import { ToastError, ToastSuccess } from "../../helpers/toast";
import { _styles } from "../../utils/playbooks/utils";
import { Prompt } from "../../utils/types/prompt";

import { insertBodyLoader, removeBodyLoader } from "src/helpers/loaders";
import {
  createPromptService,
  updatePromptService,
} from "src/services/prompts.service";
import { useReloadPlaybooks } from "../../hooks/playbook/useReloadPlaybooks";

const ScrollableTooltipContent = styled("div")(({ theme }) => ({
  maxHeight: "700px", // set a maximum height
  overflowY: "auto", // add scrollbar when content overflows
  "&::-webkit-scrollbar": {
    width: "0.4em",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(0,0,0,.1)",
    borderRadius: "4px",
  },
  "& ul": {
    padding: 0,
    margin: theme.spacing(1),
  },
  "& li": {
    listStyle: "none",
  },
}));

type CreateOrEditPlaybookTypes = {
  children: any;
  onLoadApi: any;
  onClick: any;
  id?: number;
  defaultValue?: any;
  selectedData?: any;
  setPromptList?: any;
  [x: string]: any;
};

const MERGE_FIELDS = [
  {
    label: "Your Org Name",
    value: "org_name",
    description: "Your company's name.",
  },
  {
    label: "Your Org Domain",
    value: "org_domain",
    description: "Your company web domain.",
  },
  {
    label: "Prospect First Name",
    value: "first_name",
    description: "Email reciever first name.",
  },
  {
    label: "Prospect Last Name",
    value: "last_name",
    description: "Email reciever last name.",
  },
  {
    label: "Prospect Company Name",
    value: "company_name",
    description: "Email reciever company name.",
  },
  {
    label: "Prospect Company Website",
    value: "company_domain",
    description: "Email reciever company website.",
  },
  {
    label: "Prospect City",
    value: "person_city",
    description: "Email reciever city.",
  },
  {
    label: "Prospect State",
    value: "person_state",
    description: "Email reciever state.",
  },
  {
    label: "Prospect Job Title",
    value: "job_title",
    description: "Email reciever job title.",
  },
  {
    label: "Prospect Cares About",
    value: "cares_about",
    description:
      "AI prediction on what email reciever cares about related to their job.",
  },
  {
    label: "Prospect Company Mission",
    value: "company_mission",
    description:
      "AI prediction on the mission of the company of email reciever.",
  },
  {
    label: "Prospect Company Specialty",
    value: "company_specialty",
    description:
      "AI prediction on the specialty of the company of email reciever.",
  },
  {
    label: "Prospect Company Region",
    value: "company_region",
    description:
      "AI prediction on the specialty of the company of email reciever.",
  },
  {
    label: "Prospect Company Value Proposition",
    value: "company_value_proposition",
    description:
      "AI prediction on the value proposition of the company of email reciever.",
  },
  {
    label: "Prospect Company Why Someone Cares",
    value: "company_why_someone_cares",
    description:
      "AI prediction on the reason the company of email reciever exists.",
  },
  {
    label: "Prospect Company Special to Mention",
    value: "company_special_to_mention",
    description:
      "AI prediction on a special, high value detail to note of the company of email reciever.",
  },
];

const CreateOrEditPlaybook = ({
  children,
  onLoadApi,
  onClick,
  selectedData,
  id,
  defaultValue,
  isLoading,
  setPromptList,
  ...props
}: CreateOrEditPlaybookTypes) => {
  const reloadPlaybooks = useReloadPlaybooks();
  const [open, setOpen] = useState(false);
  const [promptValue, setPromptValue] = useState<string>("");
  const [cursorPos, setCursorPos] = useState<number>(-1);
  const [tagValue, setTagValue] = useState("");

  const handleCursorPosition = (e: any) => {
    setCursorPos(e.target.selectionStart);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setPromptValue(defaultValue || '');
    reset();
  };
  useEffect(() => {
    setPromptValue(defaultValue || '');
  }, [defaultValue]);

  // const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
  //   setPromptValue(event.target.value);
  // };

  const handleAddTag = (event: any) => {
    console.log(event.target.value);
    console.log(promptValue);
    const selectedTag = event.target.value;
    setTagValue(selectedTag);

    const formatTag = "{{" + selectedTag + "}}";
    // if(promptValue) {
    let newFieldValue =
      promptValue.slice(0, cursorPos) +
      formatTag +
      promptValue.slice(cursorPos);

    setPromptValue(newFieldValue);
    // }

    setTagValue("");
    setCursorPos(-1);
  };

  const onThisEditSubmit = async (id: number) => {
    insertBodyLoader();
    ToastSuccess("Update on this prompt is in progress.");
    handleClose();
    const data = { text: promptValue };
    try {
      let res = await updatePromptService(id, data);
      if (res?.data) {
        await reloadPlaybooks();
        onLoadApi();
        handleClose();

        setPromptList((prevPromptList: Prompt[]) =>
          prevPromptList.map((prompt: Prompt) =>
            prompt.id === id ? res.data : prompt
          )
        );
        removeBodyLoader();

        ToastSuccess("Successfully updated prompt.");
      }
      return;
    } catch (e: any) {
      ToastError("Something went wrong!");
      devLogError(() => {
        console.error(e);
      });
      removeBodyLoader();
      return;
    }
  };

  const onThisAddSubmit = async () => {
    insertBodyLoader();
    ToastSuccess("Adding new prompt");
    handleClose();
    const payload = { text: promptValue, playbook: selectedData.id };
    devLog(() => {
      console.log(payload);
    });
    try {
      let res = await createPromptService(payload);
      if (res?.data) {
        await reloadPlaybooks();
        onLoadApi();
        handleClose();
        setPromptList((prevPromptList: any) => [...prevPromptList, res.data]);
        removeBodyLoader();
        ToastSuccess("New prompt successfully created.");
        devLog(() => {
          console.log(res.data);
        });
        reset();
      }
    } catch (e: any) {
      ToastError("Something went wrong!");
      devLogError(() => {
        console.error(e);
      });
      removeBodyLoader();
      return;
    }
  };

  const menuItemLoop = () => {
    return MERGE_FIELDS.map((field) => {
      return <MenuItem value={field.value}>{field.label}</MenuItem>;
    });
  };

  const MergeFieldsTooltip = () => {
    const tooltipContent = (
      <ScrollableTooltipContent>
        <Typography px={2} mt={2}>
          Context tags empower you to instruct the AI to add data into each
          prompt to drive greater personalization.{" "}
        </Typography>

        <Typography px={2} mt={2}>
          These tags are similar to email merge fields, but instead of using
          them personalize a template that is already written, they personalize
          the instructions for writing each email.
        </Typography>

        <List dense>
          {MERGE_FIELDS.map((field) => (
            <ListItem key={field.value}>
              <ListItemText
                primary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      color="white"
                      style={{ fontWeight: "bold" }}
                    >
                      {field.label}
                    </Typography>
                    <Typography component="span" variant="body2" color="white">
                      {` - ${field.description}`}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
          ))}
        </List>
      </ScrollableTooltipContent>
    );

    return (
      <Tooltip title={tooltipContent} placement="left">
        <Typography>Hover over me to see context tag definitions</Typography>
      </Tooltip>
    );
  };

  return (
    <>
      <Button
        onClick={() => {
          handleOpen();
          onClick();
        }}
        {...props}
      >
        {children}
      </Button>

      {open && (
        <Dialog
          open={open}
          onClose={handleClose}
          scroll="body"
          fullWidth={true}
          maxWidth="lg"
          aria-labelledby={`${id ? "Edit" : "New"} Prompt`}
          aria-describedby={`${id ? "edit" : "add"} prompt modal`}
          disableEnforceFocus={true}
        >
          <DialogTitle
            variant="h5"
            className="tw-text-black tw-bg-[#EAEAEA] tw-tracking-[0.36px] tw-font-normal tw-py-6"
          >
            <Box className="tw-flex tw-justify-between">
              <Stack direction="row" spacing={4} alignItems={"center"}>
                <Box className="tw-text-[18px] tw-flex tw-flex-col tw-justify-center tw-align-middle">
                  {id ? "Edit" : "Add New"} Prompt
                </Box>

                <Box width="500px">
                  <TextField
                    error={cursorPos > -1 ? false : true}
                    label="Add Tag"
                    select
                    size="small"
                    color="secondary"
                    value={tagValue}
                    onChange={(e) => {
                      handleAddTag(e);
                    }}
                    helperText={
                      cursorPos > -1
                        ? "Choose Tag"
                        : "Click in the text field where do you want to insert tags"
                    }
                    disabled={cursorPos > -1 ? false : true}
                    fullWidth
                  >
                    {menuItemLoop()}
                  </TextField>
                </Box>
                <MergeFieldsTooltip />
              </Stack>
              <Box>
                <Button className="tw-min-w-min" onClick={handleClose}>
                  <CloseIcon sx={{ color: "#A5A5A5", fontSize: 26 }} />
                </Button>
              </Box>
            </Box>
          </DialogTitle>
          <DialogContent className="tw-p-0" style={{ width: "100%" }}>
            <Grid container spacing={0} style={{ width: "100%" }}>
              <Grid item xs={12} style={{ width: "100%" }}>
                <Box
                  className={`message-container ${_styles?.containers} tw-border-b-0 tw-px-[24px] xl:tw-px-[24px]`}
                  style={{ width: "100%" }}
                >
                  <Box className="tw-flex" style={{ width: "100%" }}>
                    <Box
                      className={`${_styles?.message} tw-text-[16px] tw-text-black tw-py-3.5`}
                      style={{ width: "100%" }}
                    >
                      <Box
                        className={`tw-text-[18px] tw-text-black tw-truncate tw-font-normal tw-w-full lg:tw-w-full xl:tw-w-full 2xl:tw-w-full 2xl:tw-pl-0`}
                        style={{ width: "100%" }}
                      >
                        <textarea
                          rows={9}
                          onKeyUp={handleCursorPosition}
                          onClick={handleCursorPosition}
                          onInput={handleCursorPosition}
                          className={`${_styles?.labelValueInput} tw-text-[16px] placeholder:tw-text-[#B9B9B9] placeholder:tw-font-normal`}
                          value={promptValue}
                          {...register("message", {
                            required: "This is a required field.",
                          })}
                          onChange={(e) => setPromptValue(e.target.value)}
                          placeholder="Add prompt here..."
                          style={{ width: "100%" }}
                        />
                        <ErrorMessage
                          errors={errors}
                          name="message"
                          render={({ message }) => (
                            <FormHelperText sx={{ color: "success.main" }}>
                              {message}
                            </FormHelperText>
                          )}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions className="tw-flex tw-justify-end tw-px-6 tw-pb-5">
            <Box>
              <Button
                onClick={handleSubmit(() =>
                  id ? onThisEditSubmit(id) : onThisAddSubmit()
                )}
                variant="contained"
                color="primary"
                className="tw-bg-primary tw-font-medium hover:tw-bg-primaryDark tw-text-[16px] tw-px-[26px] tw-py-[13px] tw-uppercase"
              >
                Save
              </Button>
            </Box>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default CreateOrEditPlaybook;
