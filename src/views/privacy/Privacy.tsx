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
        Privacy Notice
      </Typography>
      <Box className="tw-py-3" />
      <i>Effective Date: August 14, 2023</i>
      <CustomHeader>Contents</CustomHeader>
      <ul className="tw-list-decimal tw-ml-6">
        <li>Scope</li>
        <li>Personal Information We Collect</li>
        <li>Why We Collect Your Personal Information</li>
        <li>Sharing Personal Information</li>
        <li>Security of Personal Information</li>
        <li>International Transfers of Personal Information</li>
        <li>Accessing or Updating Your Personal Information</li>
        <li>Retention of Personal Information</li>
        <li>Children</li>
        <li>Special Notice for Individuals in certain States in the US</li>
        <li>Special Notice for Individuals in the EEA, UK and Switzerland</li>
        <li>Updates</li>
        <li>How to Contact Us</li>
      </ul>
      <CustomHeader>1. Scope</CustomHeader>
      <p>
        CallSine LLC and its affiliate companies (“CallSine,” “we,” “us,” or
        “our”) are committed to protecting your privacy.
      </p>
      <p>
        This Privacy Notice informs you how we collect, use, secure and share
        your personal information collected by us when you visit our websites
        (“Website”), visit our branded social media pages, visit our offices,
        receive communication from us, register or attend our events or
        webinars, or ask questions about our products “Interactions”). Please
        note that our Websites may include links to other organizations’
        websites whose privacy practices may differ from those of CallSine. If
        you submit information to any of those sites, your information is
        governed by their privacy notices. We encourage you to carefully read
        the privacy notices of any website you visit.
      </p>
      <strong className="tw-italic">
        If you do not feel comfortable with any part of this Privacy Notice,
        please immediately cease using our Websites and do not engage in
        Interactions with us.
      </strong>
      <CustomHeader>2. Personal Information We Collect</CustomHeader>
      <p>
        Except as described in this Privacy Notice, CallSine will not give,
        sell, rent, or loan to any third party any of the personal information
        you provide us. Personal information is generally any information that
        identifies you or makes you identifiable such as your name, IP address,
        or user preferences. We may collect, store, and use the following kinds
        of personal information from you in relation to the Websites and
        Interactions:
      </p>
      <p>
        <strong className="tw-underline">
          a. Information You Voluntarily Provide.
        </strong>{" "}
        We will collect personal information when you voluntarily provide it to
        us (including to our service providers or other parties who collect it
        on our behalf). For example, we collect personal information when you
        request information about our services or products, CallSine event or
        webinar.
      </p>
      <p>
        <strong className="tw-underline">
          b. Information About Transactions.
        </strong>{" "}
        We collect information about any transactions carried out between you
        and us on or in relation to this website, including information relating
        to any purchases you make of our goods or services, including your first
        and last name, title, position, employer, and contact information.
      </p>
      <p>
        <strong className="tw-underline">
          c. Information From Offline Sources.
        </strong>{" "}
        We may also collect personal information from you offline, such as when
        you attend one of our events, or during phone calls with sales
        representatives. The personal information we collect may include contact
        information (such as your name, address, telephone number or email
        address), professional information (such as your job title, department
        or job role), and contact preferences.
      </p>
      <p>
        <strong className="tw-underline">
          d. Information We Automatically Collect.
        </strong>
      </p>
      <Box>
        <p>
          <strong>(i) Log Data.</strong> When you use our Websites, we may
          automatically record information from your device, its software, and
          your activity using the Websites (“Log Data”). This may include such
          information as the device’s Internet Protocol (“IP”) address, browser
          type, the web page visited before you came to our website, information
          you search for on our website, length of visit and number of page
          views, locale preferences, identification numbers associated with your
          devices, your mobile carrier, date and time stamps associated with
          transactions, and system configuration information.
        </p>
        <p>
          <strong>(ii) Location Data.</strong> We may collect geolocation and
          proximity of your device if location services are enabled on your
          device (e.g., GPS-based functionality on mobile devices used to access
          our website) and may use that information to customize the
          interactions with location-based information and features. If you
          access our website through a mobile device and you do not want your
          device to provide us with location-tracking information, you can
          disable the GPS or other location-tracking functions on your device,
          provided your device allows you to do this.
        </p>
        <p>
          <strong>(iii) Cookies.</strong> We use “cookies” to collect
          information and improve our interactions with you. A cookie is a small
          data file that we transfer to your device. We may use “persistent
          cookies” to save your registration ID and login password for future
          logins to our website, such as, to register for webinars. We may use
          “session ID cookies” to enable certain features of the Websites, to
          better understand how your interactions with us and to monitor
          aggregate usage and web traffic routing on our website. For more
          information on how we use Cookies and similar technologies, please
          contact us at{" "}
          <a href="mailto:info@callsine.com" className="tw-underline">
            info@callsine.com
          </a>
          .
        </p>
        <p>
          <strong>(iv) Third Parties.</strong> We may collect personal
          information from third party sources. You may choose to register
          events sponsored by our partners where we will share your information
          with our marketing partners. To engage in marketing activities, we may
          collect personal information disclosed by you on message boards, chat
          features, blogs and other services or platforms to which you are able
          to post information and materials (including third-party services and
          platforms). We process such information to better understand you, to
          maintain and improve the accuracy of the information we store about
          you, and to better promote or optimize our communications with you,
          including providing information about our services and products.
        </p>
      </Box>
      <p>
        If you choose to limit our collection or use of your personal
        information or choose not to provide certain personal information, some
        or all of our services, programs, or events may not be available to you,
        and we may not be able to respond to your requests.
      </p>
      <CustomHeader>3. Why We Collect Your Personal Information</CustomHeader>
      <p>
        In general, we use personal information to create, develop, operate,
        deliver, and improve our Websites and be able to offer our services and
        products. We may use your personal information to:
      </p>
      <p>
        <strong>a. Respond to Requests.</strong> We may process your personal
        information when you contact us, such as with questions, concerns and
        feedback. We share this information with third parties upon your
        request, or with our service providers or partners to the extent
        necessary to provide you a response. [Performance of Contract,
        Legitimate Interest, Consent]
      </p>
      <p>
        <strong>b. Facilitate and Evaluate Use of the Services.</strong> We may
        use your personal information to provide you with the online services,
        to facilitate your use of the online services (such as facilitating
        navigation and the login process, preserving information between
        sessions and enhancing security), to improve quality, to evaluate page
        response rates and determine content. [Performance of Contract,
        Legitimate Interest]
      </p>
      <p>
        <strong>c. Improve the Accuracy of our Records.</strong> We may use the
        personal information we receive from you or third parties to better
        understand you and/or maintain and improve the accuracy of the records
        we hold about you. [Legitimate Interest, Consent]
      </p>
      <p>
        <strong>d. Personalize your Experience.</strong> We also may use cookies
        and similar tracking technology to personalize your experience. By
        personalizing our communications, we enable you to more easily use our
        website because we keep track of your preferences (e.g., your language
        selection,
      </p>
      <p>
        <strong>
          e. Ensure the Security of the Websites and Interactions.
        </strong>{" "}
        We may process your personal information to help monitor, prevent and
        detect fraud, enhance security, and combat spam, malware, malicious
        activities or security risks; improve and enforce our security measures;
        and to monitor the security of our website [Performance of Contract,
        Legitimate Interest].
      </p>
      <p>
        <strong>f. Marketing.</strong> We may use information we obtain from
        you, your interactions with CallSine and our website, and from third
        party sources to provide you with marketing and promotional
        communications, to deliver targeted and relevant advertising and
        marketing to you, to determine the effectiveness of our marketing and
        promotional campaigns, to better understand you and your preferences,
        and to position and promote our services and products. Our marketing
        will be conducted in accordance with your advertising / marketing
        preferences and as permitted by applicable law.
      </p>
      <p>
        <strong>g. Conferences and Events.</strong> CallSine and our partners
        may use your personal information to communicate with you about our
        events or our partner events. After the event, CallSine may contact you
        about the event and related products and services and may share
        information about your attendance with our conference sponsors and
        partners, where legally permitted to do so. If a partner or conference
        sponsor directly requests your personal information at their conference
        booths or presentations, your personal information will be handled in
        accordance with their privacy practices. [Legitimate Interest, Consent]
      </p>
      <p>
        If you choose to limit our collection or use of your personal
        information, some or all of our services may not be available to you and
        we may not be able to respond to certain of your requests.
      </p>
      <p className="tw-italic">
        If, in the future, we use your personal information in a way that is not
        described in this Privacy Notice, we will provide notice. Notice may be
        provided in accordance with Section 12 (Updates).
      </p>
      <CustomHeader>4. Sharing Personal Information</CustomHeader>
      <p>
        We share your personal information only with third parties who have a
        legitimate purpose for accessing it. We will only share your information
        in the following circumstances:
      </p>
      <p>
        <strong>a. Service Providers, Business Partners and Others.</strong> We
        may share your personal information with third parties, such as vendors,
        consultants, agents and other service providers who work on our behalf.
        Examples include vendors and service providers who provide assistance
        with marketing, billing, processing credit card payments, data analysis
        and insight, technical support and customer service. We may also share
        your personal information with our event partners, including sponsors of
        events hosted or sponsored by us, provided that we will obtain your
        consent prior to such disclosure where required by law.
      </p>
      <p>
        <strong>
          b. Compliance with Laws and Law Enforcement Requests; Protection of
          Our Rights.
        </strong>{" "}
        We may disclose your personal information to third parties when we have
        a good faith belief that disclosure is reasonably necessary to: (i)
        comply with a law, regulation or legal requests including to meet
        national security or law enforcement requirements; (ii) protect the
        safety of any person from death or serious bodily injury; (iii) prevent
        fraud or abuse of CallSine or its user, or (iv) protect CallSine’s
        property rights.
      </p>
      <p>
        <strong>c. Business Transfers.</strong> If we are involved in a merger,
        acquisition, or sale of all or a portion of our assets, your information
        may be transferred as part of that transaction, but we will notify you
        (for example, via email and/or a prominent notice on our website) of any
        change in control or use of your personal information, or if you become
        subject to a different Privacy Notice. We will also notify you of
        choices you may have regarding the information.
      </p>
      <p>
        <strong>d. Affiliates.</strong> We may share your personal information
        with our affiliates so that they can help provide or support our
        websites or services, service your account, or troubleshoot concerns or
        support other legitimate business operations.
      </p>
      <CustomHeader>5. Security of Personal Information</CustomHeader>
      <p>
        We will take reasonable precautions to prevent the loss, misuse or
        alteration of your personal information. Data transmission over the
        Internet is inherently insecure and we cannot guarantee the security of
        data sent over the Internet.
      </p>
      <p>
        We will store all the personal information you provide on our secure
        servers. You are responsible for keeping your passwords confidential. We
        will not ask you for your passwords.
      </p>
      <p>
        We have procedures in place to ensure we can react to any reasonably
        foreseeable issue. If you ever find a security issue, or simply have a
        security related concern, please reach out directly to us. The quickest
        and most effective way is by sending an email to{" "}
        <a href="mailto:info@callsine.com" className="tw-underline">
          info@callsine.com
        </a>
        .
      </p>
      <CustomHeader>
        6. International Transfers of Personal Information
      </CustomHeader>
      <p>
        By submitting your personal information via this website or otherwise,
        your information will be transferred to us in the United States. The
        United States may have data protection laws that are less protective
        than the laws of the jurisdiction in which you reside. If you do not
        want your personal information transferred to or processed or maintained
        in the United States, you should not use our Websites or should not
        engage in Interactions with us.
      </p>
      <p>
        If you are a citizen of or reside in the European Economic Area (“EEA”),
        the United Kingdom (“UK”), or Switzerland, we comply with applicable
        laws to provide an adequate level of data protection for the transfer of
        your personal information to third countries. For more information, see
        Section 11 (Special Notice for Individuals in the EEA, UK, and
        Switzerland).
      </p>
      <CustomHeader>
        7. Accessing or Updating Your Personal Information
      </CustomHeader>
      <p>
        We depend on you to update and correct personal information to the
        extent necessary for the purposes for which the information was
        collected or subsequently authorized by you. You may contact CallSine as
        indicated below to request that we update or correct relevant personal
        information that is demonstrated to be inaccurate or incomplete, except
        where the burden or expense of providing access would be
        disproportionate to the risks to the privacy of the individual in the
        case in question or where the rights of persons other than the
        individual would be violated. We may seek to verify your identity when
        we receive your privacy rights request to ensure the security of your
        personal information.
      </p>
      <CustomHeader>8. Retention</CustomHeader>
      <p>
        We retain your personal information for as long as is necessary to
        fulfill the purposes for which it was collected, including for the
        purposes of satisfying any legal, regulatory, accounting, or reporting
        requirements, or to resolve disputes. Consistent with these
        requirements, we will look to delete your personal information within
        the time limits imposed by applicable law, if any, upon request
      </p>
      <CustomHeader>9. Children</CustomHeader>
      <p>
        Our Websites and Interactions are not directed to persons under 18, and
        we do not knowingly collect personal information from children under 18.
        If a parent or guardian becomes aware that his or her child has provided
        us with personal information without their consent, he or she should
        contact us at{" "}
        <a href="mailto:info@callsine.com" className="tw-underline">
          info@callsine.com
        </a>
        . If we become aware that a child under 18 has provided us with personal
        information, we will take steps to delete from our files.
      </p>
      <CustomHeader>
        10. Special Notice for Individuals in certain States within the US
      </CustomHeader>
      <p>
        This section supplements the other information included in this Notice
        and applies solely to individuals who reside in the United States and
        who qualify as a “consumer” as such term is defined by the state law
        applicable to such individual.
      </p>
      <CustomHeader>California Residents</CustomHeader>
      <p>
        This section applies only to California residents and the terms used
        have the same meaning as set out in the California Consumer Privacy Act
        of 2018 (“CCPA”) as amended by the California Privacy Rights Act 2020
        (“CPRA”).
      </p>
      <p>
        Personal Information Collected. Below is a summary of the personal
        information categories that we collected in the last 12 months, the
        reason we collect your personal information, where we obtain the
        personal information we collect about you, and the categories of third
        parties with whom we share your personal information. For more
        information about the personal information we collect, please refer to
        Section 2 (Personal Information We Collect).
      </p>
      <ul className="tw-list-disc tw-ml-6">
        <li>
          <strong>Identifiers:</strong> We may collect identifiers such as a
          name, address, unique personal identifiers, email, phone number, your
          device’s IP address, software and identification numbers associated
          with your devices, and other similar identifiers.
        </li>
        <li>
          <strong>Commercial information:</strong> We may collect commercial
          information such as records of products or services purchased,
          obtained, or considered by you.
        </li>
        <li>
          <strong>
            Internet or other electronic network activity information:
          </strong>{" "}
          We may collect information regarding your browsing history, search
          history, your interaction with our services, your interaction with an
          internet website, the web page visited before you came to our website,
          length of visit and number of page views, locale preferences, your
          mobile carrier, date and time stamps associated with transactions, and
          system configuration information.
        </li>
        <li>
          <strong>Geolocation data:</strong> We may collect information that is
          sufficient to identify your general location, such as your IP address.
          For the avoidance of doubt, this does not currently include precise
          geolocation data.
        </li>
        <li>
          <strong>
            Sensory data, such as audio, electronic, visual, or other similar
            information:
          </strong>{" "}
          We may collect audio recordings when you call us or participate in a
          call with us and audio/video recordings when you attend a meeting with
          us or when you attend one of our sponsored events.
        </li>
        <li>
          <strong>Inferences:</strong> We may collect information about your
          preferences, characteristics, behavior, and attitudes.
        </li>
        <li>
          <strong>
            Professional/Employment-related information or Education
            information:
          </strong>{" "}
          We may collect professional or employment-related information or
          education information, such as your job title, professional
          affiliations, and employment history, but only to the extent
          voluntarily provided by you or made available to us by trusted third
          parties.
        </li>
        <li>
          <strong>Sensitive Personal Information:</strong> When you log into or
          use our services or any web page hosted by us, we may collect account
          log-in data in combination with a security or access code, password,
          or credentials to authenticate and enable access to your accounts. We
          collect such information directly from you through your interactions
          with our services or web pages and, in some cases, from third-party
          user identification or authentication services that you utilize. We do
          not sell or share (as such terms are defined by the CCPA) this
          information.
        </li>
      </ul>
      <p>
        We collect the above information for the purposes described in Section 3
        (Why We Collect Your Personal Information) as well as any other purposes
        separately notified to you.
        <br />
        Further, we share the personal information described above with the
        parties identified in Section 4 (Information Sharing).
      </p>
      <p>
        <u>California Residents Rights.</u> California residents have the
        following rights (“Rights”) listed below. Certain rights are not
        absolute, such as your right to know and right to deletion, and are
        subject to certain exceptions. For instance, we cannot disclose specific
        pieces of personal information if the disclosure would create a
        substantial, articulable, and unreasonable risk to the security of the
        personal information, your account with us, or the security of the
        business’s systems of networks.
      </p>
      <ul className="tw-list-disc tw-ml-6">
        <li>
          <strong>Right to Know.</strong> You have the right to know what
          personal information about you we have collected, used, disclosed,
          sold, and shared, if applicable, during the preceding 12 months. You
          have the right to request in writing from us a copy of the categories
          of personal information we have collected about you, the categories of
          sources from which we collected that information, why we collected
          information about you, and the business or commercial purpose for
          selling, sharing, or disclosing your personal information (if
          applicable), the categories of third parties with whom we disclosed,
          sold, or shared your personal information, and the categories of
          personal information that we disclosed, sold, or shared about you for
          a business purpose. We are only required to respond twice per calendar
          year to your right-to-know requests.
        </li>
        <li>
          <strong>Right to Deletion.</strong> You have the right to request that
          we delete any personal information we have collected from you or
          maintain about you. We honor such requests unless an exception
          applies, such as when the information is necessary to complete the
          transaction or contract for which it was collected or when information
          is being used to detect, prevent, or investigate security incidents,
          comply with laws or legal obligation, identify and repair bugs, or
          ensure another consumer’s ability to exercise their free speech rights
          or other rights provided by law.
        </li>
        <li>
          <strong>
            Right to Opt-Out of the Sale of Your Personal Information.
          </strong>{" "}
          If a business sells your personal information, you have the right to
          opt-out. We will not sell any of your personal information unless we
          first notify you separately in writing. You may opt out of the sale of
          your personal information by utilizing the “do not sell or share my
          personal information” banner on our website.
        </li>
        <li>
          <strong>Right to Information on Personal Data Sharing.</strong> You
          may have the right to request information from us regarding whether we
          share certain categories of your personal information with third
          parties for the third parties’ direct marketing purposes, including
          the categories of information we disclosed to third parties for the
          third parties’ direct marketing purposes during the preceding calendar
          year; the names and addresses of third parties that received such
          information, or if the nature of their business cannot be determined
          from the name, then examples of the products or services marketed. To
          the extent we participate in such sharing, you are entitled to receive
          a copy of this information in a standardized format and the
          information will not be specific to you individually.
        </li>
        <li>
          <strong>
            Right to Opt-Out of the Sharing of Your Personal Information.
          </strong>{" "}
          You have the right to opt out of a business sharing your personal
          information with third parties. We may engage in “sharing” under the
          CCPA, which is broadly defined as disclosing personal information for
          purposes of cross-context behavioral advertising, including instances
          where companies target advertising based on personal information
          obtained from a consumer’s activity across distinctly branded websites
          or services. We share information as outlined in our Cookie Policy and
          Section 4 (Information Sharing). You may opt out of the “sharing” of
          your personal information by utilizing the “do not sell or share my
          personal information” banner on our website.
        </li>
        <li>
          <strong>Right to Correct Inaccurate Personal Information.</strong> You
          have the right to request that we correct inaccurate personal
          information. We will use commercially reasonable efforts to correct
          your information as directed by you, or provide you with instructions
          on how you can correct your information.
        </li>
        <li>
          <strong>Right to Non-Discrimination.</strong> We will not discriminate
          against you for exercising your rights. Specifically, we will not deny
          you services, charge you different prices or rates for services, or
          provide you a different level or quality of services, because you
          elected to exercise your rights.
        </li>
        <li>
          <strong>
            Right to limit the use of Sensitive Personal Information.
          </strong>{" "}
          The CCPA allows you to limit certain uses and disclosures of your
          sensitive personal information to certain purposes specified by law
          (e.g., providing you with services you request or preventing fraud, or
          for other purposes that don’t involve deriving your attributes).
          Because of our limited use of your sensitive personal data, we are not
          required to offer you this opt out right.
        </li>
      </ul>
      <p>
        <u>Exercising Your Rights.</u> You may exercise your rights by
        contacting us as outlined in Section 13 (How to Contact Us). To verify
        your identity, we may ask you to verify personal information we already
        have on file for you. If we cannot verify your identity from this
        information, we may request additional information, which will only be
        used for the to verify your identity, and for security or
        fraud-prevention purposes. In some instances, we may seek for you to
        identify at least three pieces of your personal information maintained
        by the business and submit a signed declaration under penalty of perjury
        that you are a California consumer whose personal information is the
        subject of the request. <br />
        You may designate an authorized agent to make a request to exercise your
        rights outlined in this Notice. We will respond to your authorized
        agent’s request if they submit proof that they are registered with the
        California Secretary of State to be able to act on your behalf, or
        submit evidence you have provided them with power of attorney pursuant
        to Probate Code section 4000 to 4465. We may deny requests from
        authorized agents who do not submit proof that they have been authorized
        by you to act on their behalf.
      </p>
      <p>
        In certain situations, You may have the right to appeal the denial your
        request to exercise your rights. Please submit an appeal using the
        contact information in Section 13 (How to Contact Us).
      </p>
      <p>
        <u>Do Not Track Disclosure.</u> CallSine does not have a mechanism in
        place for responding to browser “do not track” signals or other similar
        mechanisms used to limit collection of information for use in online
        behavioral advertising.
      </p>
      <CustomHeader>United States residents generally:</CustomHeader>
      <p>
        In states where residents are allowed additional individual rights, we
        are committed to honoring those rights for such residents, including
        requests that may limit how we use and share your data, or requests to
        delete or correct inaccurate data, consistent with applicable law. Note
        that the applicable law may exempt certain personal information from
        such requests. To submit a request based on local law, please contact us
        as indicated in Section 13 (How to Contact Us). We will respond to your
        request as required by law. If any circumstances cause a material delay
        in our response, you will be promptly notified. <br />
        Under certain state laws, certain residents may out of the sale or
        sharing of their personal information, or the use of their personal
        information for targeted advertising or profiling purposes. We will not
        sale your personal information unless we first provide you with a
        separate notice prior to such sale. To exercise a legal right you have
        to opt-out of or limit these activities, please contact using the
        methods outlined in Section 13 (How to Contact Us). <br />
        In certain situations, You may have the right to appeal the denial your
        request to exercise your rights. Please submit an appeal using the
        contact information in Section 13 (How to Contact Us).
      </p>
      <CustomHeader>
        11. Special Notice for Individuals in the EEA, UK, and Switzerland
      </CustomHeader>
      <p>
        This section only applies to interactions with individuals who are
        citizens of, or at the time of data collection reside in the EEA, UK or
        Switzerland (collectively, the “Designated Countries”).
      </p>
      <p>
        <strong>
          <u>a. Role.</u>
        </strong>{" "}
        CallSine is a data controller with respect to any personal information
        collected from the Website and Interactions. Any third parties that
        handle your personal information in accordance with our instructions are
        our service providers and are “data processors.” You are a “user.” Users
        are individuals providing personal information to us via the Websites
        and Interactions.
      </p>
      <p>
        <strong>
          <u>b. Marketing.</u>
        </strong>{" "}
        We will only contact individuals located in the Designated Countries by
        electronic means (including email or SMS) based on our legitimate
        interests, as permitted by applicable law, or the individual’s consent.
        If you do not want us to use your personal information in this way
        please go to the email settings for your account to opt out, click an
        unsubscribe link in your emails, or contact us at info@callsine.com. You
        can object to direct marketing at any time and free of charge.
      </p>
      <p>
        <strong>
          <u>c. Additional Privacy Rights.</u>
        </strong>{" "}
        We provide you with the rights described below. We may limit these
        privacy rights requests (i) where denial of access is required or
        authorized by law, (ii) when granting access would have a negative
        impact on others’ privacy, (iii) to protect our rights and properties,
        or (iv) where the request is frivolous or burdensome. If you would like
        to exercise your rights under applicable law, please contact us at
        info@callsine.com. We may seek to verify your identity when we receive
        your privacy rights request to ensure the security of your personal
        information.
      </p>
      <ul className="tw-list-disc tw-ml-6">
        <li>
          <strong>Right to withdraw consent.</strong> For any consent-based
          processing of your personal information, you have the right to
          withdraw your consent. A withdrawal of consent will not affect the
          lawfulness of our processing or the processing of any third parties
          based on consent before your withdrawal.
        </li>
        <li>
          <strong>Right of access/right of portability.</strong> You may have
          the right to access the personal information that we hold about you,
          and in some limited circumstances, have the personal information
          provided to you so that you can provide that personal information to
          another controller.
        </li>
        <li>
          <strong>Right to rectification.</strong> You may request to correct
          any of your personal information in our files.
        </li>
        <li>
          <strong>Right to erasure.</strong> In certain circumstances, you may
          have a right to the erasure of your personal information that we hold
          on you.
        </li>
        <li>
          <strong>Right to restriction.</strong> You have the right to request
          that we restrict our processing of your personal information in
          certain circumstances.
        </li>
        <li>
          <strong>Right to object to processing.</strong> You have the right to
          object to our processing of your personal information at any time and
          as permitted by applicable law if we process your personal information
          on the legal bases of: consent; contract; or legitimate interests. We
          may continue to process your personal information if it is necessary
          for the defense of legal claims, or for any other exceptions permitted
          by applicable law.
        </li>
        <li>
          <strong>Notification to third parties.</strong> When we fulfill your
          individual rights requests for correction, erasure or restriction of
          processing, we may choose to notify third parties also handling the
          relevant personal information unless this proves impossible or
          involves disproportionate effort.
        </li>
        <li>
          <strong>Right to Lodge Complaint.</strong> We commit to resolve
          complaints about our collection or use of your personal information.
          EEA, UK, or Swiss individuals with inquiries or complaints regarding
          this privacy notice should first contact us at{" "}
          <a href="mailto:info@callsine.com" className="tw-underline">
            info@callsine.com
          </a>
          . You also have the right to lodge a complaint with the supervisory
          authority of your habitual residence, place of work or place of
          alleged infringement, if you consider that the processing of your
          personal information infringes applicable law.
        </li>
      </ul>
      <p>
        <strong>
          <u>d. International Transfers.</u>
        </strong>{" "}
        In allowing you to use Website and Interactions we may need to transfer
        your personal information outside the Designated Countries including to
        countries that do not provide the same level of protection for personal
        information. In such case, we will only transfer personal information to
        recipients that provide an adequate level of data protection or as
        permitted by applicable data protection laws by implementing appropriate
        safeguards, including, but not limited to, relevant data transfer
        agreements based on the EU Standard Contractual Clauses or UK Standard
        Contractual Clauses, as applicable (“Clauses”). The Clauses shall apply
        to any transfers of personal information from the Designated Countries
        to countries which do not ensure an adequate level of data protection
        within the meaning of applicable laws of the foregoing territories.
      </p>
      <p>
        <strong>
          <u>e. Legal Bases for Processing Personal Information.</u>
        </strong>{" "}
        Our legal bases for collecting and using the personal information
        described above will depend on the type of personal information
        collected, the specific context in which we collect it and the purposes
        for which it is used. Whenever we require your consent for the
        processing of your personal information such processing will be based on
        Article 6(1) lit. (a) GDPR or the equivalent legal bases in the
        applicable law. If the processing of your personal information is
        necessary for the performance of a contract between you and CallSine or
        for taking any pre-contractual steps upon your request, such processing
        will be based on Article 6(1) lit. (b) GDPR. If this data is not
        processed, CallSine will not be able to execute the contract with you.
        Where the processing is necessary for us to comply with a legal
        obligation, we will process your information on the basis of Article
        6(1) lit. (c) GDPR, for example for complying with obligations under
        anti-money laundering laws. Where the processing is necessary for the
        purposes of CallSine’s or another party’s legitimate interests, such
        processing will be made in accordance with Article 6(1) lit. (f) GDPR.
      </p>
      <CustomHeader>12. Updates</CustomHeader>
      <p>
        We may update this Privacy Notice from time to time. If we make material
        changes to the way we collect, use, share or process the personal
        information that you provide, we will notify you by posting a notice of
        the changes in a clear and conspicuous manner on the website, via the
        most recent email address we have on file for you, or via another
        communication channel where permitted by law.
      </p>
      <CustomHeader>13. How to Contact Us</CustomHeader>
      <p>
        To exercise your rights, or if you have any questions about this Notice
        or our treatment of your personal information, please send us an email
        at{" "}
        <a href="mailto:info@callsine.com" className="tw-underline">
          info@callsine.com
        </a>{" "}
        or by post to CallSine LLC, 44 Lafayette Rd., PO Box 263, North Hampton,
        NH 03862.
      </p>
      <Box className="tw-py-[100px]" />
    </Box>
  );
};

export default Privacy;
