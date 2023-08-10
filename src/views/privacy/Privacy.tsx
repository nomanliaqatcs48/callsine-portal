import { Box, Link, Typography } from "@mui/material";
import React from "react";

const Privacy = () => {
  const CustomHeader = ({ children, ...props }: any) => {
    return (
      <Typography
        className="tw-text-[18px] tw-pt-[25px] tw-pb-[10px] tw-font-bold"
        {...props}
      >
        {children}
      </Typography>
    );
  };

  const CustomSubheader = ({ children, ...props }: any) => {
    return (
      <Typography
        className="tw-text-[16px] tw-py-[10px] tw-font-bold tw-normal-case"
        {...props}
      >
        {children}
      </Typography>
    );
  };

  const CustomParagraph = ({ children, ...props }: any) => {
    return (
      <Typography
        className="tw-text-[15px] tw-py-[10px] tw-leading-loose"
        {...props}
      >
        {children}
      </Typography>
    );
  };

  return (
    <Box className="tw-px-[20px] tw-pt-[150px] lg:tw-px-[96px] 2xl:tw-px-[240px]">
      <Typography variant="h1" className="">
        Privacy Policy
      </Typography>

      <CustomHeader>Last Updated: August 9, 2023</CustomHeader>

      <CustomParagraph>
        This is the Privacy Policy (“Privacy Policy”) of CallSine (“CallSine” or
        “us” or “we,” or “our” when possessive). This Privacy Policy explains
        how CallSine collects, uses and stores the information we obtain from or
        about you when you use our website,{" "}
        <Link href="https://callsine.com/">www.callsine.com</Link> (“Website”),
        our technical software (“Software”), related services (“Services”) and
        any related data, information and materials (“Content”) (collectively
        the Website, the Software, the Services and the Content are the
        “Platform”). By using the Platform, or any part thereof, you accept this
        Privacy Policy and you expressly consent to our collection, storage, use
        and disclosure of your information as described in this Privacy Policy.
        You (the “Customer,” or “End User,” or “you” or “your” when possessive)
        represent, warrant, and covenant that you have the power and authority
        and the legal right to agree to this Privacy Policy. This Privacy
        Policy, as may be amended from time to time in our sole discretion,
        applies to you, your information, and your use of the Platform, or any
        part thereof.
      </CustomParagraph>

      <CustomHeader>INFORMATION WE COLLECT</CustomHeader>

      <CustomParagraph>
        Registering with the Platform, requires certain information such as: (1)
        personally identifiable information, which is information that
        identifies you personally, including but not limited to your first and
        last name, email address, and phone number(s) (“Personal Information”);
        and (2) non-personal information, including but not limited to
        information about your location, age, gender, content consumption habits
        (“Non-Personal Information”). We may collect this information through
        various forms and in various places on the Platform, including if you
        register for an account, through “contact” forms, or when you otherwise
        interact with the Platform in any way. If we combine Non-Personal
        Information with the Personal Information we collect directly from you
        on the Platform, we will treat the combined data as Personal Information
        under this Privacy Policy.
      </CustomParagraph>

      <CustomParagraph>
        Except to the extent required by applicable law, Non-Personal
        Information is data that is not treated as Personal Information under
        this Privacy Policy. In addition, as permitted by applicable law,
        Personal Information, including, without limitation, CallSine-Collected
        PI (defined below), once aggregated or “de-identified” (i.e., the
        removal of personal identifiers from data to make it no longer
        personally identifiable) is also non-Personal Information and will be
        owned by us and may be used and shared without obligation to you, except
        as prohibited by applicable law. To the extent any non-Personal
        Information is combined by or on behalf of CallSine with Personal
        Information CallSine itself collects directly from you on the Platform
        (“CallSine-Collected PI”), CallSine will treat the combined data as
        CallSine-Collected PI under this Privacy Policy.
      </CustomParagraph>

      <CustomHeader>INFORMATION THIRD PARTIES PROVIDE ABOUT YOU</CustomHeader>

      <CustomParagraph>
        We may receive information about you from our affiliates, from any other
        users of the Platform, or from any other third parties that may provide
        us information we deem relevant to your use of the Platform. We may in
        our sole discretion collect and use this information.
      </CustomParagraph>

      <CustomHeader>INTERACTIONS WITH THIRD PARTIES</CustomHeader>

      <CustomParagraph>
        You may interact with others on the Platform, or any part thereof,
        including other users of the Platform. These third parties may also
        collect, use and disclose information about you. This Privacy Policy
        does not cover such third parties or any products or services they may
        offer. Please review any terms of service, privacy policy, engagement
        agreement or similar agreement provided to you by any such third party
        or consult with such third party directly for information regarding how
        they collect, use and disclose information about you obtained in
        connection with their provision of products or services to you.
      </CustomParagraph>

      <CustomHeader>HOW WE USE AND SHARE INFORMATION</CustomHeader>

      <CustomSubheader>Personal and Non-Personal Information</CustomSubheader>

      <CustomParagraph>
        We may use your Personal Information or Non-Personal Information at
        CallSine’s sole discretion for various purposes, including but not
        limited to: processing of transactions; providing special offers catered
        to users’ needs; enabling users to participate in the Platform’s
        features; providing users with a customized experience; providing
        customer support; contacting user regarding any updates or changes to
        this Privacy Policy or Terms of Service; and for other purposes
        disclosed at the time you provide your information or as otherwise set
        forth in this Privacy Policy.
      </CustomParagraph>

      <CustomParagraph>
        We may use Non-Personal Information to help us improve the Platform, or
        any part thereof, and to customize the user experience. We may also
        aggregate Non-Personal Information in order to track trends and analyze
        use patterns on the Platform. This Privacy Policy does not limit in any
        way our use or disclosure of Non-Personal Information and we reserve the
        right to use and disclose such Non-Personal Information to our partners,
        advertisers and other third parties at our discretion (including
        aggregated and/or anonymized information about our users and their use
        of the Platform or any part thereof). We do not use or respond to “do
        not track” signals that may be sent from your mobile device.
      </CustomParagraph>

      <CustomSubheader>
        Push Notifications; Emails, In-Platform Messages
      </CustomSubheader>

      <CustomParagraph>
        We may send in-platform notifications to communicate with you about the
        Platform, or any part thereof. We may also send you emails that are
        initiated by use of the Platform, or any part thereof, which include,
        but are not limited to, notifications, confirmations and other types of
        messages. We may also send newsletter-type emails, which you may opt out
        of.
      </CustomParagraph>

      <CustomSubheader>
        Mergers, Acquisitions and Similar Business Transactions
      </CustomSubheader>

      <CustomParagraph>
        In the event CallSine undergoes a business transaction such as a merger
        with or acquisition by another company, or sale of all or a portion of
        our assets, or in the event of our bankruptcy or insolvency, your
        Personal Information, as well as Non-Personal Information, may be among
        the assets transferred to a third party. You acknowledge and consent
        that such transfers may occur and are permitted by this Privacy Policy,
        and that any acquirer of our assets may continue to process your
        Personal Information as set forth in the then in effect Privacy Policy.
      </CustomParagraph>

      <CustomSubheader>Sharing Information as Required by Law</CustomSubheader>

      <CustomParagraph>
        CallSine cooperates with government and law enforcement officials to
        enforce and comply with the law. We may therefore disclose your Personal
        Information and Non-Personal Information, if we have a good faith belief
        that it is reasonably necessary to: (1) satisfy any applicable law,
        regulation, legal process or enforceable governmental request; (2)
        enforce our Terms of Service or this Privacy Policy, including, but not
        limited to, investigation of potential violations thereof or hereof; (3)
        detect, prevent, or otherwise address fraud, security or technical
        issues; or (4) protect against harm to the rights, property or safety of
        CallSine, its users or the public as required or permitted by law.
        CallSine is not precluded from disclosure of any such information by any
        rule governing attorney/client privilege, confidentiality, attorney work
        product or any similar rule in your or any jurisdiction.
      </CustomParagraph>

      <CustomHeader>DATA RETENTION</CustomHeader>

      <CustomParagraph>
        We may store information you provide us, or information that is
        generated or collected automatically, for as long as is necessary to
        provide the Platform, or any part thereof.
      </CustomParagraph>

      <CustomHeader>YOUR PREFERENCES</CustomHeader>

      <CustomParagraph>
        If you would prefer not to receive product or promotional offers from us
        via email, you can use the unsubscribe links contained in our email
        messages.
      </CustomParagraph>

      <CustomHeader>DATA SECURITY</CustomHeader>

      <CustomParagraph>
        CallSine and our service providers implement commercially reasonable
        security measures designed to protect your information from unauthorized
        access, disclosure or accidental loss or destruction of Non-Personal
        Information and Personal Information. We utilize appropriate physical,
        technical and managerial safeguards designed to protect the information
        we collect from or about our users, and we take commercially reasonable
        steps to protect the privacy of your information.
      </CustomParagraph>

      <CustomParagraph>
        However, no data transmission over the Internet, mobile networks,
        wireless transmission or electronic storage of information can be
        guaranteed to be 100% secure. Please note that we cannot ensure the
        security of any information you transmit to us, and you use our Platform
        and provide us with your information at your own risk.
      </CustomParagraph>

      <CustomHeader>CHANGES TO OUR PRIVACY POLICY</CustomHeader>

      <CustomParagraph>
        We may occasionally update this Privacy Policy. When we do update this
        Privacy Policy, we will also revise the “Last Updated” date at the top
        of the Privacy Policy. If we make changes to this Privacy Policy that,
        in our discretion, we consider significant, we will post the updated
        Privacy Policy on the Platform and we may also send e-mails to our users
        who have created an Account containing a link to the revised Privacy
        Policy. Please review this Privacy Policy periodically to stay informed
        about how we are protecting the Personal Information we collect. If you
        continue to use the Platform, or any part thereof, after we post an
        update to this Privacy Policy, you indicate your acceptance of the
        updated Privacy Policy.
      </CustomParagraph>

      <Box className="tw-py-[100px]" />
    </Box>
  );
};

export default Privacy;
