import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import { FC, useState } from "react";

import {
  createStripeCustomer,
  createSubscriptionService,
} from "src/services/payments.service";
import SuccessModal from "./SuccessModal";
import { IPlan } from "./interfaces";
interface CheckoutFormProps {
  planData: IPlan;
}
interface PriceDetails {
  description: string;
  priceId: string;
}

const getPriceDetails = (planData: IPlan): PriceDetails => {
  if (planData.selectedPlan === "solo") {
    if (planData.billingCycle === "monthly") {
      return {
        description: "$99/month",
        priceId: "price_1NonVVGKOS0SXyxuTKJv6vGl",
      };
    } else {
      return {
        description: `$${89 * 12}/year ($89/month)`,
        priceId: "price_1Nov6zGKOS0SXyxuQrAD0UJr",
      };
    }
  } else if (planData.selectedPlan === "team") {
    if (planData.billingCycle === "monthly") {
      return {
        description: `$${89 * planData.teamMembers}/month`,
        priceId: "price_1NonVVGKOS0SXyxuTKJv6vGl",
      };
    } else {
      // yearly
      if (planData.teamMembers >= 2 && planData.teamMembers <= 10) {
        return {
          description: `$${
            79 * 12 * planData.teamMembers
          }/year ($79/month/member)`,
          priceId: "price_1Nov8PGKOS0SXyxuXk9SaUZY",
        };
      } else {
        return {
          description: `$${
            59 * 12 * planData.teamMembers
          }/year ($59/month/member)`,
          priceId: "team_yearly_11up_id",
        };
      }
    }
  }
  return {
    description: "", // Default
    priceId: "default_id",
  };
};

const CheckoutForm: FC<CheckoutFormProps> = ({ planData }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);
  // collect data from the user
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const priceDetails = getPriceDetails(planData);
  const [priceId, setPriceId] = useState(priceDetails.priceId);
  const [teamMembers, setTeamMembers] = useState(planData?.teamMembers);
  const [selectedPlan, setSelectedPlan] = useState(planData?.selectedPlan);
  const [userAddress, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
  });

  console.log(userAddress, "user address");

  const [contactNumber, setContactNumber] = useState("");
  const [wantsNewsletter, setWantsNewsletter] = useState(false);

  // stripe items
  const stripe = useStripe();
  const elements = useElements();

  // main function
  const createSubscription = async () => {
    try {
      const address: any = {
        street: userAddress.street, // Replace this with your actual state hook or variable
        city: userAddress.city, // Replace this with your actual state hook or variable
        state: userAddress.state, // Replace this with your actual state hook or variable
        zip: userAddress.zip, // Replace this with your actual state hook or variable
      };

      const customerResponse = await createStripeCustomer({
        name,
        email,
        address,
      });
      const customerId = customerResponse.data.customerId;

      // Create a payment method
      const paymentMethod = await stripe?.createPaymentMethod({
        type: "card",
        card: elements?.getElement(CardElement)!,
        billing_details: {
          name,
          email,
          //   address: {
          //     line1: userAddress.street,
          //     city: userAddress.city,
          //     state: userAddress.state,
          //     postal_code: userAddress.zip,
          //   },
          phone: contactNumber,
        },
      });
      console.log("PAYMENT METHOD", paymentMethod);

      // Call the backend to create subscription using the service you provided
      const response = await createSubscriptionService({
        customerId,
        paymentMethod: paymentMethod?.paymentMethod?.id,
        name,
        email,
        priceId,
        address, // Add this to pass the address details
        contactNumber, // Add this to pass the contact number
        wantsNewsletter, // Add this to pass the newsletter subscription flag
        teamMembers,
        selectedPlan,
        selectedCycle: planData?.billingCycle,
      });

      if (response.data.message) {
        setModalMessage(response.data.message);
        setIsSuccess(true);
      } else if (response.data.error) {
        setModalMessage(response.data.error);
        setIsSuccess(false);
      }
      setModalOpen(true);
    } catch (error) {
      console.log(error);
      alert((error as Error).message || "An error occurred!");
    }
  };

  return (
    <div className="tw-bg-[#F8FBFF] tw-rounded-lg tw-border-[1px] tw-border-[#f0f1f3] tw-p-5">
      <h2 className="tw-text-[20px] tw-tracking-[0.4px] tw-text-black tw-font-medium tw-mb-5 tw-text-center">
        Subscribe Now
      </h2>

      {/* Order Details */}
      <div className="tw-bg-white tw-p-4 tw-mb-5 tw-rounded-lg tw-border-[1px] tw-border-[#f0f1f3]">
        <div className="tw-bg-white tw-p-4 tw-mb-5 tw-rounded-lg tw-border-[1px] tw-border-[#f0f1f3]">
          <h3 className="tw-text-[18px] tw-text-black tw-font-medium tw-mb-4">
            Your Order Details
          </h3>
          <p className="tw-flex tw-justify-between">
            <strong>Plan:</strong>
            <span>
              {planData.selectedPlan.charAt(0).toUpperCase() +
                planData.selectedPlan.slice(1)}{" "}
              Plan
            </span>
          </p>
          <p className="tw-flex tw-justify-between">
            <strong>Billing Cycle:</strong>
            <span>
              {planData.billingCycle.charAt(0).toUpperCase() +
                planData.billingCycle.slice(1)}
            </span>
          </p>
          {planData.selectedPlan === "team" && (
            <p className="tw-flex tw-justify-between">
              <strong>Team Members:</strong>
              <span>{planData.teamMembers}</span>
            </p>
          )}
          <p className="tw-flex tw-justify-between">
            <strong>Price:</strong>
            <span>{getPriceDetails(planData).description}</span>
          </p>
        </div>
      </div>

      <div className="tw-grid tw-gap-4">
        <input
          placeholder="Company Name"
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="tw-bg-white tw-text-[16px] tw-font-light tw-rounded-full tw-border tw-border-[#eeeff0] tw-w-full tw-py-[1.10rem] tw-px-[1.2rem] tw-outline-none placeholder:tw-text-callsineGray"
        />
        <input
          placeholder="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="tw-bg-white tw-text-[16px] tw-font-light tw-rounded-full tw-border tw-border-[#eeeff0] tw-w-full tw-py-[1.10rem] tw-px-[1.2rem] tw-outline-none placeholder:tw-text-callsineGray"
        />

        <input
          placeholder="Email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="tw-bg-white tw-text-[16px] tw-font-light tw-rounded-full tw-border tw-border-[#eeeff0] tw-w-full tw-py-[1.10rem] tw-px-[1.2rem] tw-outline-none placeholder:tw-text-callsineGray"
        />
        <input
          placeholder="Street"
          type="text"
          value={userAddress.street}
          onChange={(e) =>
            setAddress((prev) => ({ ...prev, street: e.target.value }))
          }
          className="tw-bg-white tw-text-[16px] tw-font-light tw-rounded-full tw-border tw-border-[#eeeff0] tw-w-full tw-py-[1.10rem] tw-px-[1.2rem] tw-outline-none placeholder:tw-text-callsineGray"
        />

        <input
          placeholder="City"
          type="text"
          value={userAddress.city}
          onChange={(e) =>
            setAddress((prev) => ({ ...prev, city: e.target.value }))
          }
          className="tw-bg-white tw-text-[16px] tw-font-light tw-rounded-full tw-border tw-border-[#eeeff0] tw-w-full tw-py-[1.10rem] tw-px-[1.2rem] tw-outline-none placeholder:tw-text-callsineGray"
        />

        <input
          placeholder="State"
          type="text"
          value={userAddress.state}
          onChange={(e) =>
            setAddress((prev) => ({ ...prev, state: e.target.value }))
          }
          className="tw-bg-white tw-text-[16px] tw-font-light tw-rounded-full tw-border tw-border-[#eeeff0] tw-w-full tw-py-[1.10rem] tw-px-[1.2rem] tw-outline-none placeholder:tw-text-callsineGray"
        />

        <input
          placeholder="ZIP Code"
          type="text"
          value={userAddress.zip}
          onChange={(e) =>
            setAddress((prev) => ({ ...prev, zip: e.target.value }))
          }
          className="tw-bg-white tw-text-[16px] tw-font-light tw-rounded-full tw-border tw-border-[#eeeff0] tw-w-full tw-py-[1.10rem] tw-px-[1.2rem] tw-outline-none placeholder:tw-text-callsineGray"
        />

        <input
          placeholder="Contact Number"
          type="tel"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          className="tw-bg-white tw-text-[16px] tw-font-light tw-rounded-full tw-border tw-border-[#eeeff0] tw-w-full tw-py-[1.10rem] tw-px-[1.2rem] tw-outline-none placeholder:tw-text-callsineGray"
        />

        <div className="tw-flex tw-justify-between tw-items-center">
          <label>Get Updates via Text Message:</label>
          <input
            type="checkbox"
            checked={wantsNewsletter}
            onChange={() => setWantsNewsletter((prev) => !prev)}
          />
        </div>

        <div className="tw-border tw-border-[#f2f3f9] tw-p-3 tw-rounded">
          <CardElement />
        </div>

        <button
          onClick={createSubscription}
          disabled={!stripe}
          className="tw-bg-blue-600 hover:tw-bg-blue-500 tw-text-[16px] tw-font-medium tw-text-white tw-px-[27px] tw-py-[13px] tw-rounded-[8px] tw-uppercase tw-w-full"
        >
          Subscribe
        </button>
        <SuccessModal
          isSuccess={isSuccess}
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          message={modalMessage}
        />
      </div>
    </div>
  );
};

export default CheckoutForm;