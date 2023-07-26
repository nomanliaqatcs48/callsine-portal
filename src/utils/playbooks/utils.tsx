export const _styles = {
  containers:
    "tw-px-2 tw-py-2 tw-border-b tw-border-[#f2f3f9] xl:tw-px-10 xl:tw-py-4",
  label:
    "tw-w-4/12 tw-font-normal tw-text-[#B9B9B9] tw-text-[18px] lg:tw-w-4/12 xl:tw-w-3/12 tw-flex tw-items-center",
  labelValue:
    "tw-w-8/12 tw-font-medium tw-text-[18px] tw-text-black tw-truncate lg:tw-w-8/12 xl:tw-w-9/12",
  labelValueInput:
    "tw-w-full tw-outline-none tw-border-b tw-border-transparent tw-transition-all tw-duration-500 focus:tw-border-b focus:tw-border-[#569ade]",
  message:
    "tw-w-full tw-font-normal tw-outline-none tw-leading-[25px] tw-border-b tw-border-transparent tw-transition-all tw-duration-500 focus:tw-border-b focus:tw-border-[#569ade]",
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
          message:
            "Write A Short Follow Up Email, From (Forg_Name]| To (First_Name|| At (Icompany_Namell. This Should Be No More Than 100 Words, And Should eference That We Are Following Up On An Email Sent Previously. essage Should Reference The Case Study At This Link: ttps://Www.Dbadbadba.Com/Case_Studies/B_Charitable And Direct The Recipient To That Link In The Body Of The Message. Say One Thing In The Message That Relates To This Case Study: Https://Www.Dbadbadba.Com/Case_Studies/_Charitable And That It Might Be Interesting To (Company_Namell. Message Should Not Refer To The Sender Of This Message By Name In The Body Of The Message. Tone Should Be Conversational. Message Should Refer To (Forg_Namell’s Experience. Message Should Not Refer To Sender As “We” But Instead As *” Message Should Not Repeat Words Like “Experience”",
        },
      ],
    },
  };
};
