import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import React, { FC, useEffect, useMemo, useState } from "react";

import styled from "@emotion/styled";
import { Box, Typography, FormHelperText } from "@mui/material";
import { ToastError, ToastSuccess } from "src/helpers/toast";

import { Formik } from "formik";
import * as Yup from "yup";

import {
  createStripeCustomer,
  createSubscriptionService,
} from "src/services/payments.service";
import SuccessModal from "./SuccessModal";
import { IPlan } from "./interfaces";
interface CheckoutFormProps {
  planData: IPlan;
  profileData: any;
}
interface PriceDetails {
  description: string;
  priceId: string;
}

const Line = styled.div`
  background-color: #e5e5e5;
  height: 1.4px;
  margin-bottom: 1rem;
  margin-top: 1rem;
`;

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

const CheckoutForm: FC<CheckoutFormProps> = ({ planData, profileData }) => {

  const urlRegx = /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm;

  const [checkingOut, setCheckingOut] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);
  // collect data from the user

  const priceDetails = useMemo(() => getPriceDetails(planData), [planData]);
  const [priceId, setPriceId] = useState(priceDetails.priceId);
  const [teamMembers, setTeamMembers] = useState(planData?.teamMembers);
  const [selectedPlan, setSelectedPlan] = useState(planData?.selectedPlan);

  // stripe items
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    setPriceId(priceDetails.priceId);
    setTeamMembers(planData?.teamMembers);
    setSelectedPlan(planData?.selectedPlan);
  }, [priceDetails, planData]);

  // main function
  const createSubscription = async (values: any) => {
    const { companyName, companyWebsite, name, email, street, city, state, zip, contactNumber, wantsNewsletter} = values;
    setCheckingOut(true);
    try {
      const address: any = {
        street, // Replace this with your actual state hook or variable
        city, // Replace this with your actual state hook or variable
        state, // Replace this with your actual state hook or variable
        zip, // Replace this with your actual state hook or variable
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

      // Call the backend to create subscription using the service you provided
      if(paymentMethod?.paymentMethod?.id) {
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
        companyName,
        companyWebsite,
      });

      if (response.data.message) {
        setModalMessage(response.data.message);
        setIsSuccess(true);
      } else if (response.data.error) {
        setModalMessage(response.data.error);
        setIsSuccess(false);
      }
      setCheckingOut(false);
      setModalOpen(true);
    } else {
      setCheckingOut(false);
      ToastError("Please enter the card number");
    }
    } catch (error) {
      console.log(error);
      alert((error as Error).message || "An error occurred!");
    }
    
  };

  if (planData.selectedPlan === null) {
    return null;
  }

  const isValidURL = (url: string) => {
    const pattern = new RegExp(
      "^(https://)(www\\.)?([a-zA-Z0-9]+(-?[a-zA-Z0-9])*\\.)+[\\w]{2,}(/\\S*)?$",
      "i"
    );
    return pattern.test(url);
  };

  return (
    <div className="tw-bg-white tw-rounded-lg tw-border-[1px] tw-border-[#f0f1f3] tw-p-[40px] tw-pt-[0px]">
      {/* Order Details */}
      <Box
        display={"flex"}
        justifyContent="center"
        flexDirection={"column"}
        alignItems="center"
      >
        <Typography fontWeight="bold">
          {" "}
          All Plans Come With a 2 Day Free Trial
        </Typography>
        <Typography mb={3} textAlign={"center"}>
          {" "}
          You can cancel at any time during your trial free-of-charge. First
          charge will occur automatically after trial ends.
        </Typography>
      </Box>
      <div className="tw-bg-gray-100 tw-p-4 tw-mb-5 tw-rounded-lg tw-border-[1px] tw-border-[#f0f1f3]">
        <div className="tw-p-4 tw-mb-5 tw-rounded-lg tw-border-[1px] tw-border-[#f0f1f3]">
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

          <Line />

          <p className="tw-flex tw-justify-between">
            <strong>Billing Cycle:</strong>
            <span>
              {planData.billingCycle.charAt(0).toUpperCase() +
                planData.billingCycle.slice(1)}
            </span>
          </p>

          {planData.selectedPlan === "team" && (
            <>
              <Line />

              <p className="tw-flex tw-justify-between">
                <strong>Team Members:</strong>
                <span>{planData.teamMembers}</span>
              </p>
            </>
          )}

          <Line />

          <p className="tw-flex tw-justify-between">
            <span className="tw-text-[16px]">
              <strong>Order Total:</strong>
            </span>
            <span className="tw-font-bold tw-text-[16px]">
              {getPriceDetails(planData).description}
            </span>
          </p>
        </div>
      </div>
      <div className="tw-grid tw-gap-4">
      <Formik
        initialValues={{    
          companyName: '',
          companyWebsite: "",
          name: profileData?.first_name
          ? profileData?.first_name + " " + profileData?.last_name
          : "",
          email: profileData?.email ? profileData?.email : "",    
          wantsNewsletter: false, 
          street: "",
          city: "",
          state: "",
          zip: "",
          contactNumber: "",
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          companyName: Yup.string()
            .max(50)
            .required("Company name is required"),
          companyWebsite: Yup.string()
          .matches(urlRegx, "Website should be a valid URL")
          .required("This field is required"),
          name: Yup.string()
            .max(50)
            .matches(/^[A-Za-z ]*$/, 'Please enter only alphabat')
            .required("This field is required"),
          email: Yup.string()
            .email("Must be a valid email")
            .max(50)
            .label("Email")
            .required("This field is required"),
          street: Yup.string()
            .max(100)
            .required("This field is required"),
          city: Yup.string()
            .max(50)
            .required("This field is required"),
          state: Yup.string()
            .max(50)
            .required("This field is required"),
          zip: Yup.string()
            .max(50)
            .matches(/^\d+$/, 'The field should have digits only')
            .required("This field is required"),
          contactNumber: Yup.string()
            .max(50)
            .matches(/^\d+$/, 'The field should have digits only')
            .required("This field is required"),
        })}
        onSubmit={(values) => {
          const { companyName, companyWebsite, name, email, street, city, state, zip, contactNumber} = values;
          if(companyName && companyWebsite && name && email && street && city && state && zip && contactNumber) {
          createSubscription(values)
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
          setFieldValue
        }: any) => (
          <form noValidate onSubmit={handleSubmit}>
      
        <label className="tw-mt-4">
          Company Name
          <input
            type="text"
            value={values.companyName}
            name="companyName"
            onBlur={handleBlur}
            onChange={handleChange}
            className="tw-bg-gray-100 tw-text-[16px] tw-font-light tw-border tw-border-[#eeeff0] tw-w-full tw-py-[1.10rem] tw-px-[1.2rem] tw-outline-none placeholder:tw-text-callsineGray"
          />
        </label>
        {touched.companyName && errors.companyName && (
          <FormHelperText
            error
            className="tw-mb-3"
            id="standard-weight-helper-text-first_name-register"
          >
            {errors.companyName}
          </FormHelperText>
        )}
        <label className="tw-mt-4">
          Company Website
          <input
            type="text"
            name="companyWebsite"
            value={values.companyWebsite}
            onBlur={handleBlur}
            onChange={handleChange}
            className="tw-bg-gray-100 tw-text-[16px] tw-font-light tw-border tw-border-[#eeeff0] tw-w-full tw-py-[1.10rem] tw-px-[1.2rem] tw-outline-none placeholder:tw-text-callsineGray"
          />
        </label>
        {touched.companyWebsite && errors.companyWebsite && (
          <FormHelperText
            error
            className="tw-mb-3"
            id="standard-weight-helper-text-first_name-register"
          >
            {errors.companyWebsite}
          </FormHelperText>
        )}

        <label className="tw-mt-4">
          Name
          <input
            type="text"
            name="name"
            value={values.name}
            onBlur={handleBlur}
            onChange={handleChange}
            className="tw-bg-gray-100 tw-text-[16px] tw-font-light tw-border tw-border-[#eeeff0] tw-w-full tw-py-[1.10rem] tw-px-[1.2rem] tw-outline-none placeholder:tw-text-callsineGray"
          />
        </label>
        {touched.name && errors.name && (
          <FormHelperText
            error
            className="tw-mb-3"
            id="standard-weight-helper-text-first_name-register"
          >
            {errors.name}
          </FormHelperText>
        )}
        <label className="tw-mt-4">
          E-mail
          <input
            disabled={true}
            type="text"
            name="email"
            value={values.email}
            onBlur={handleBlur}
            onChange={handleChange}
            className="tw-bg-gray-100 tw-text-[16px] tw-font-light tw-border tw-border-[#eeeff0] tw-w-full tw-py-[1.10rem] tw-px-[1.2rem] tw-outline-none placeholder:tw-text-callsineGray"
          />
        </label>
        {touched.email && errors.email && (
          <FormHelperText
            error
            className="tw-mb-3"
            id="standard-weight-helper-text-first_name-register"
          >
            {errors.email}
          </FormHelperText>
        )}
        <label className="tw-mt-4">
          Street
          <input
            type="text"
            name="street"
            value={values.street}
            onBlur={handleBlur}
            onChange={handleChange}
            className="tw-bg-gray-100 tw-text-[16px] tw-font-light tw-border tw-border-[#eeeff0] tw-w-full tw-py-[1.10rem] tw-px-[1.2rem] tw-outline-none placeholder:tw-text-callsineGray"
          />
        </label>
        {touched.street && errors.street && (
          <FormHelperText
            error
            className="tw-mb-3"
            id="standard-weight-helper-text-first_name-register"
          >
            {errors.street}
          </FormHelperText>
        )}
        <label className="tw-mt-4">
          City
          <input
            type="text"
            name="city"
            value={values.city}
            onBlur={handleBlur}
            onChange={handleChange}
            className="tw-bg-gray-100 tw-text-[16px] tw-font-light tw-border tw-border-[#eeeff0] tw-w-full tw-py-[1.10rem] tw-px-[1.2rem] tw-outline-none placeholder:tw-text-callsineGray"
          />
        </label>
        {touched.city && errors.city && (
          <FormHelperText
            error
            className="tw-mb-3"
            id="standard-weight-helper-text-first_name-register"
          >
            {errors.city}
          </FormHelperText>
        )}
        <label className="tw-mt-4">
          State
          <input
            type="text"
            name="state"
            value={values.state}
            onBlur={handleBlur}
            onChange={handleChange}
            className="tw-bg-gray-100 tw-text-[16px] tw-font-light tw-border tw-border-[#eeeff0] tw-w-full tw-py-[1.10rem] tw-px-[1.2rem] tw-outline-none placeholder:tw-text-callsineGray"
          />
        </label>
        {touched.state && errors.state && (
          <FormHelperText
            error
            className="tw-mb-3"
            id="standard-weight-helper-text-first_name-register"
          >
            {errors.state}
          </FormHelperText>
        )}
        <label className="tw-mt-4">
          Zip
          <input
            type="text"
            name="zip"
            value={values.zip}
            onBlur={handleBlur}
            onChange={handleChange}
            className="tw-bg-gray-100 tw-text-[16px] tw-font-light tw-border tw-border-[#eeeff0] tw-w-full tw-py-[1.10rem] tw-px-[1.2rem] tw-outline-none placeholder:tw-text-callsineGray"
          />
        </label>
        {touched.zip && errors.zip && (
          <FormHelperText
            error
            className="tw-mb-3"
            id="standard-weight-helper-text-first_name-register"
          >
            {errors.zip}
          </FormHelperText>
        )}
        <label className="tw-mt-4">
          Contact Number (Telephone)
          <input
            type="tel"
            name="contactNumber"
            value={values.contactNumber}
            onBlur={handleBlur}
            onChange={handleChange}
            className="tw-bg-gray-100 tw-text-[16px] tw-font-light tw-border tw-border-[#eeeff0] tw-w-full tw-py-[1.10rem] tw-px-[1.2rem] tw-outline-none placeholder:tw-text-callsineGray"
          />
        </label>
        {touched.contactNumber && errors.contactNumber && (
          <FormHelperText
            error
            className="tw-mb-3"
            id="standard-weight-helper-text-first_name-register"
          >
            {errors.contactNumber}
          </FormHelperText>
        )}
        <div className="tw-flex tw-justify-between tw-items-center tw-mt-4 tw-mb-4">
          <label>Get Updates via Text Message:</label>
          <input
            type="checkbox"
            checked={values.wantsNewsletter}
            onChange={() => setFieldValue("wantsNewsletter", !values.wantsNewsletter)}
          />
        </div>

        <div className="tw-border tw-border-[#f2f3f9] tw-p-3 tw-rounded tw-mt-4 tw-mb-3">
          <CardElement />
        </div>

        <button
          // onClick={createSubscription}
          type="submit"
          disabled={!stripe}
          className="tw-bg-blue-600 hover:tw-bg-blue-500 tw-text-[16px] tw-font-medium tw-text-white tw-px-[27px] tw-py-[13px] tw-rounded-[8px] tw-uppercase tw-w-full tw-mt-4"
        >
          {checkingOut ? "Processing..." : "Checkout"}
        </button>
        </form>
        )}
      </Formik>
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

export default React.memo(CheckoutForm);
