import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import React, { useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Stack, Typography } from "@mui/material";

interface TemplateCenterProps {
  disabled: boolean;
}

interface Template {
  title: string;
  prompt: string;
  tags: string[];
}

const templates: Template[] = [
  {
    title: "Template 1",
    prompt: "Example prompt",
    tags: ["opportunity"],
  },
  {
    title: "Template 2",
    prompt: "Example prompt",
    tags: ["event"],
  },
  {
    title: "Template 3",
    prompt: "Example prompt",
    tags: ["promise"],
  },
];

const TemplateCard: React.FC<{ template: Template }> = ({ template }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(template.prompt);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // reset after 2 seconds
  };

  return (
    <div
      className={`tw-border tw-mb-4 tw-flex tw-flex-col tw-justify-between `}
    >
      <div>
        <h2 className="tw-text-md tw-font-bold tw-border-b tw-pb-2 tw-mb-2">
          {template.title}{" "}
        </h2>
        <div className="tw-relative tw-rounded-lg tw-border tw-border-[#f0f1f3] tw-mb-2">
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <p
              onClick={handleCopy}
              className="tw-cursor-pointer tw-border-b tw-pb-2 tw-mb-2 tw-pt-2 tw-px-4"
            >
              {template.prompt}
              {isCopied && (
                <div
                  className={`tw-tooltip tw-bg-gray-800 tw-text-white tw-text-xs tw-rounded tw-py-1 tw-px-4 tw-absolute tw-right-[55px] tw-w-[100px] tw-justify-center tw-top-[12px]`}
                >
                  <Typography textAlign="center">Copied</Typography>
                </div>
              )}
            </p>

            <div className="tw-relative tw-rounded-r-lg  tw-h-[50px] tw-w-[50px] tw-bg-[#f0f1f3] tw-grid tw-items-center tw-justify-center">
              <ContentCopyIcon
                onClick={handleCopy}
                fontSize="small"
                className="tw-text-gray-500 tw-cursor-pointer"
              />
            </div>
          </Stack>
        </div>
      </div>
      <div className="tw-flex tw-justify-end">
        <div className="tw-flex tw-gap-2">
          {template.tags.map((tag, index) => (
            <span
              key={index}
              className="tw-bg-gray-300 tw-px-2 tw-py-1 tw-rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const TemplateCenter: React.FC<TemplateCenterProps> = ({ disabled }) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTemplates, setFilteredTemplates] = useState(templates);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(event.target.value);
    setFilteredTemplates(
      templates.filter(
        (template) =>
          template.title.toLowerCase().includes(query) ||
          template.prompt.toLowerCase().includes(query) ||
          template.tags.some((tag) => tag.toLowerCase().includes(query))
      )
    );
  };

  return (
    <div>
      <Button
        disabled={disabled}
        variant="contained"
        color="primary"
        onClick={handleOpen}
        className="tw-bg-gray-600 hover:tw-bg-gray-500 tw-text-[16px] tw-font-medium tw-mr-2 tw-text-white tw-px-[27px] tw-py-[13px] tw-rounded-[8px] tw-uppercase"
      >
        Use Template
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle className="tw-text-lg">Template Center</DialogTitle>
        <DialogContent style={{ height: "500px", overflowY: "auto" }}>
          <DialogContentText>
          Find a Template from the below and use it in your next awesome playbook simply by copying and pasting into your prompt!
          </DialogContentText>
          <input
            type="search"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearch}
            className="tw-bg-[#F8FBFF] tw-mt-3 tw-text-[16px] tw-font-light tw-rounded-full tw-border tw-border-[#eeeff0] tw-w-full tw-py-[1.10rem] tw-px-[1.2rem] tw-outline-none placeholder:tw-text-callsineGray tw-mb-4"
          />
          {filteredTemplates.map((template, index) => (
            <TemplateCard key={index} template={template} />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Back to Playbooks
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TemplateCenter;
