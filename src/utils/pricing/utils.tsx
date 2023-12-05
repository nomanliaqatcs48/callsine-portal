import { Box } from "@mui/material";

export const pricingItems = () => [
  {
    name: "Monthly Freedom",
    price: (
      <>
        <Box className="tw-text-center">
          <strong className="tw-text-[40px]">$99</strong> <br />
          <strong className="tw-text-[16px]">per seat per month</strong>
        </Box>
      </>
    ),
    description:
      "Ideal for those who prefer flexibility and wish to adapt to changing needs. This option lets you enjoy all the premium features, support, and seamless experience of CallSine, billed on a convenient monthly basis. No strings attached!",
    onClick: () => {
      window.location.href = "/signup";
    },
    buttontext: "Get Started",
    bottomContent: "For growing teams focused on building more together",
    isPopular: false,
  },
  {
    name: "Volume Discount",
    price: (
      <>
        <Box className="tw-text-center">
          <strong className="tw-text-[40px]">$79</strong> <br />
          <strong className="tw-text-[16px]">per seat per month</strong>
        </Box>
      </>
    ),
    description:
      "Opt for our multi-seat subscription and save. if you have a need for 5 to 20 seats, you will get a $20 per month discount for all seats. That's a $240 savings per seat per year.  And it’s still month to month, no contract.",
    onClick: () => {
      window.location.href = "/signup";
    },
    buttontext: "Get Started",
    bottomContent:
      "For organization that need to scale how they collaborate and track work",
    isPopular: true,
  },
  {
    name: "Enterprise Elevation",
    price: (
      <>
        <Box className="tw-text-center">
          <strong className="tw-text-[30px]">Custom Pricing</strong>
        </Box>
      </>
    ),
    description:
      "For organizations requiring over 20 seats, our Enterprise Elevation plan offers custom-tailored features to meet your unique needs. Contact us to discuss your specific requirements, and we'll design a package that fits just right.",
    onClick: () => {
      window.location.href = "/signup";
    },
    buttontext: "Contact Sales",
    bottomContent:
      "For enterprises with global scale, security, and governance needs",
    isPopular: false,
  },
];

export const compareFeaturesHeader = [
  {
    title: "FEATURE",
    items: [
      {
        plan: "",
        desc: "Monthly Freedom",
      },
      {
        plan: "",
        desc: "Volume Discount",
      },
      {
        plan: "",
        desc: "Enterprise Elevation",
      },
    ],
  },
];

export const compareFeaturesItems = [
  {
    title: "User limit per site",
    items: [
      {
        plan: "Monthly Freedom",
        desc: "10 users",
      },
      {
        plan: "Volume Discount",
        desc: "35,000 users",
      },
      {
        plan: "Enterprise Elevation",
        desc: "35,000 users",
      },
    ],
  },
  {
    title: "Number of sites",
    items: [
      {
        plan: "Monthly Freedom",
        desc: "One",
      },
      {
        plan: "Volume Discount",
        desc: "One",
      },
      {
        plan: "Enterprise Elevation",
        desc: "Unlimited",
      },
    ],
  },
  {
    title: "Capacity management",
    items: [
      {
        plan: "Monthly Freedom",
        desc: "",
      },
      {
        plan: "Volume Discount",
        desc: (
          <span
            className="tw-flex tw-justify-center tw-items-center"
            style={{
              backgroundColor: "#00875a",
              display: "flex",
              width: 24,
              height: 24,
              lineHeight: 24,
              color: "#fff",
              fontWeight: "bold",
              borderRadius: "50%",
              flexShrink: 0,
              margin: 4,
            }}
          >
            {" "}
            ✓{" "}
          </span>
        ),
      },
      {
        plan: "Enterprise Elevation",
        desc: (
          <span
            className="tw-flex tw-justify-center tw-items-center"
            style={{
              backgroundColor: "#00875a",
              display: "flex",
              width: 24,
              height: 24,
              lineHeight: 24,
              color: "#fff",
              fontWeight: "bold",
              borderRadius: "50%",
              flexShrink: 0,
              margin: 4,
            }}
          >
            {" "}
            ✓{" "}
          </span>
        ),
      },
    ],
  },
  {
    title: "CallSine Analytics",
    items: [
      {
        plan: "Monthly Freedom",
        desc: "",
      },
      {
        plan: "Volume Discount",
        desc: "",
      },
      {
        plan: "Enterprise Elevation",
        desc: (
          <span
            className="tw-flex tw-justify-center tw-items-center"
            style={{
              backgroundColor: "#00875a",
              display: "flex",
              width: 24,
              height: 24,
              lineHeight: 24,
              color: "#fff",
              fontWeight: "bold",
              borderRadius: "50%",
              flexShrink: 0,
              margin: 4,
            }}
          >
            {" "}
            ✓{" "}
          </span>
        ),
      },
    ],
  },
];
