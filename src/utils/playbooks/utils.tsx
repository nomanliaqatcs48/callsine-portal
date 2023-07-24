export const _styles = {
  containers:
    "tw-px-2 tw-py-2 tw-border-b tw-border-[#f2f3f9] xl:tw-px-10 xl:tw-py-4",
  label:
    "tw-w-4/12 tw-font-light tw-text-[#B9B9B9] lg:tw-w-3/12 xl:tw-w-2/12 2xl:tw-w-1/12 tw-flex tw-items-center",
  labelValue:
    "tw-w-8/12 tw-font-normal tw-truncate lg:tw-w-9/12 xl:tw-w-10/12 2xl:tw-w-11/12 2xl:tw-pl-4",
  labelValueInput:
    "tw-w-full tw-outline-none tw-border-b tw-border-transparent tw-transition-all tw-duration-500 focus:tw-border-b focus:tw-border-[#569ade]",
  message:
    "tw-w-full tw-outline-none tw-border-b tw-border-transparent tw-transition-all tw-duration-500 focus:tw-border-b focus:tw-border-[#569ade]",
};

export const dummyData = () => {
  return {
    data: {
      count: 2,
      results: [
        {
          id: 1,
          position: "1",
          name: "Playbook 1",
          message: "Lorem Ipsum Dolor Sit Amet, Consectetur Adidd",
        },
        {
          id: 2,
          position: "2",
          name: "Playbook 2",
          message: "Lorem Ipsum Dolor Sit Amet, Consectetur Adidd",
        },
      ],
    },
  };
};
