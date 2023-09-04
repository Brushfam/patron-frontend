export const point0 = [
    {
        text: (
            <p>
                Patron values your privacy and treats privacy seriously. We recognize the importance
                of maintaining the confidentiality of personal information.
            </p>
        ),
    },
    {
        text: (
            <p>
                This Privacy Policy applies to any and all services, applications, platforms,
                websites, or other affiliated ventures offered by Patron.
            </p>
        ),
    },
    {
        text: (
            <p>
                Throughout this Policy, “Patron” and “We” refers to patron.works managed by Brushfam
                OÜ and its affiliates.
            </p>
        ),
    },
    {
        text: (
            <p>
                Brushfam OÜ is the controller for the purposes of the General Data Protection
                Regulation (the “GDPR”) in respect of patron.works
            </p>
        ),
    },
    {
        text: (
            <p>
                “You” or “Users” refers to you, our users and everyone who uses, subscribes to,
                publishes through, joins, or visits patron.works
            </p>
        ),
    },
    {
        text: (
            <p>
                The “Patron Service” refers to the applications, platform, website and services
                controlled, operated or produced by Patron
            </p>
        ),
    },
    {
        text: (
            <p>
                By using the Patron Service, you expressly consent to the information handling
                practices described in this Policy.
            </p>
        ),
    },
    {
        text: (
            <p>
                Your use of the Patron Service and any personal information you provide through the
                Patron Service are subject at all times to this Privacy Policy and the Terms of
                Service.
            </p>
        ),
    },
]

const ListText = (listPoints) => {
    return (
        <ul>
            {listPoints &&
                listPoints.map((item, i) => {
                    return <li key={i.toString()}>{item}</li>
                })}
        </ul>
    )
}

export const points = [
    {
        title: <p>1. Collection of the Information</p>,
        point: [
            {
                text: (
                    <p>
                        Your privacy is important to us and We have taken steps to ensure that We do
                        not collect more information from You than is necessary for us to provide
                        You with our services and to protect your account.
                    </p>
                ),
            },
            {
                text: (
                    <p>
                        Information You Provide: You may provide to Patron certain information
                        (often called “personally identifiable” information), such as your wallet
                        address, date of registration, authentication token, source code, WASM
                        bytecode, metadata of contracts that were created from the archives with the
                        downloaded source code, build logs and logs of access to the server (IP
                        address, User-Agent, path to which access was gained) . By providing us with
                        your code through our command-line interface, you give us consent to use it
                        only for verification, it remains your exclusive property and is not
                        disclosed to anyone. You may provide us with this information if you use
                        certain services or products from the Patron Service, enter contests or
                        conferences, or otherwise use the features and functionality of the Patron
                        Service.
                    </p>
                ),
            },
            {
                text: (
                    <p>
                        If You contact our contact center, We may record Your conversation with us
                        and collect additional information to verify Your identity. In connection
                        with any transaction and payment services, information, including virtual
                        currency addresses.
                    </p>
                ),
            },
            {
                text: (
                    <p>
                        We record details of users’ activities with the Service. We log technical
                        information about Your use of the Services, including the dates and times
                        that You visit, access, or use the Patron Service.
                    </p>
                ),
            },
            {
                text: (
                    <p>
                        We also may use these technologies to collect information regarding Your
                        interaction with e-mail messages, such as whether You opened, clicked on, or
                        forwarded a message. This information is gathered from all users, and may be
                        connected with other information about You.
                    </p>
                ),
            },
            {
                text: (
                    <p>
                        Information from Other Sources: We may obtain information from third parties
                        and sources other than the Patron Service, such as our partners and
                        advertisers.
                    </p>
                ),
            },
        ],
    },

    {
        title: <p>2. Use of the Information</p>,
        point: [
            {
                text: (
                    <p>
                        Patron collects and processes personal information about You only where We
                        have a legal basis for doing so under applicable data protection law,
                        including under the GDPR. The legal bases will depend on the purpose for
                        which We process Your personal information. This means We collect and use
                        Your personal information only where:
                    </p>
                ),
            },
            {
                text: ListText([
                    "We need it to provide the Services, and personalized features and to protect the safety and security of the Services;",
                    "It satisfies a legitimate interest (which is not overridden by Your rights and interests), such as for research and development, to market and promote the Services and to protect our legal rights and interests;",
                    "You give us consent to do so for a specific purpose;",
                    "We need to process Your personal information to comply with a legal obligation.",
                ]),
            },
            {
                text: (
                    <p>
                        We may use Your e-mail address for administrative communications such as
                        notifying You of major Patron Service updates, and to send privacy or
                        security related notices. Patron uses all of the information that We collect
                        to understand the usage trends and preferences of our Users, to improve the
                        way the Patron Service works and looks, to create new features and
                        functionality.
                    </p>
                ),
            },
        ],
    },

    {
        title: <p>3. Your Rights</p>,
        point: [
            {
                text: (
                    <p>
                        If You have consented to our use of personal information about You for a
                        specific purpose, You have the right to change Your consent at any time. In
                        certain circumstances, You have rights under the GDPR in relation to Your
                        personal information.
                    </p>
                ),
            },
            {
                text: ListText([
                    "Request access to Your personal information. You may have the right to request access to any personal information We hold about You as well as related information, including the purposes for processing the personal information, the recipients or categories of recipients with whom the personal information has been shared, where possible, the period for which the personal information will be stored, the source of personal information, and the existence of any automated decision making.",
                    "Request correction of Your personal information. You may have the right to obtain without undue delay the rectification of any inaccurate personal information We hold about You.",
                    "Request erasure of Your personal information. You may have the right to request that personal information held about You is deleted.",
                    "Request restriction of processing Your personal information. You may have the right to prevent or restrict processing of Your personal information.",
                    "Request transfer of Your personal information. You may have the right to request transfer of personal information directly to a third party where this is technically feasible.",
                ]),
            },
            {
                text: (
                    <p>
                        These data privacy rights do not apply to Patron where We process Your
                        personal information as a data processor on behalf of our partners. Where
                        this is the case, any request to exercise Your European data privacy rights
                        should be directed to our partners (i.e. the data controllers).
                    </p>
                ),
            },
        ],
    },

    {
        title: <p>4. Disclosure of the Information</p>,
        point: [
            {
                text: (
                    <p>
                        Patron does not share personally identifiable information about You with
                        other organizations for their marketing or promotional uses without Your
                        prior express consent. Please be aware, however, that any personally
                        identifiable information that You voluntarily choose to display on any
                        publicly available portion of the Patron Service, becomes publicly available
                        and may be collected and used by others without restriction.
                    </p>
                ),
            },
            {
                text: (
                    <p>
                        Patron may disclose automatically collected and other aggregate
                        non-personally-identifiable information (such as code checked using Patron
                        Services) which can be displayed on our website.
                    </p>
                ),
            },
            {
                text: (
                    <p>
                        We may disclose some limited User information to affiliated companies or
                        other businesses or persons to:
                    </p>
                ),
            },
            {
                text: ListText([
                    "provide website hosting, maintenance, and security services;",
                    "conduct data analysis and create reports;",
                    "offer certain functionality;",
                    "assist Patron in improving our Service and creating new services features.",
                ]),
            },
            {
                text: (
                    <p>
                        We generally contractually require that these parties process such
                        information in compliance with this Privacy Policy, authorize only a limited
                        use of such information, and require these parties to use reasonable
                        confidentiality measures.
                    </p>
                ),
            },
            {
                text: (
                    <p>
                        Patron may disclose User information if required to do so by law or in the
                        good-faith belief that such action is necessary to comply with state and
                        federal laws or respond to a court order, judicial or other government
                        orders. We shall require any third party, including without limitation any
                        government or enforcement entity, seeking access to data We hold to have
                        obtained a court order, or proof they are statutorily empowered to access
                        Your data and that their request is valid and within their power.
                    </p>
                ),
            },
            {
                text: (
                    <p>
                        Patron also reserves the right to disclose User information that We believe,
                        in good faith, is appropriate or necessary:
                    </p>
                ),
            },
            {
                text: ListText([
                    "to take precautions against liability;",
                    "protect Patron from fraudulent, abusive, or unlawful uses;",
                    "to investigate and defend ourselves against third-party claims or allegations; to assist government enforcement agencies;",
                    "to protect the security or integrity of the Patron Service;",
                    "to protect the rights, property, or personal safety of Patron, our Users, or others.",
                ]),
            },
            {
                text: (
                    <p>
                        In the event that Patron is acquired by or merged with a third-party entity,
                        We may transfer or assign the information that We have collected from Users
                        as part of that merger, acquisition, sale, or other change of control.
                    </p>
                ),
            },
        ],
    },

    {
        title: <p>5. Your Choices and Access to Your Personal Information</p>,
        point: [
            {
                text: (
                    <p>
                        If You decline to share Your personally-identifiable information with
                        Patron, We may not be able to provide to You some of the features and
                        functionality found on the Patron Service. You may view, update, correct, or
                        delete Your user information and preferences by contacting{" "}
                        <span style={{ textDecoration: "underline" }}>support@patron.works</span>.
                    </p>
                ),
            },
        ],
    },

    {
        title: <p>6. Advertisers and Third Parties</p>,
        point: [
            {
                text: (
                    <p>
                        Patron does not allow other companies, including third-party ad servers or
                        ad networks, to serve advertisements within the Patron Service.
                    </p>
                ),
            },
            {
                text: (
                    <p>
                        Patron does not provide Your personally identifiable information to these
                        third-party ad servers or ad networks without Your consent. However, Patron
                        reserves the right to add or remove third-party ad networks or ad servers
                        only after changes in the Privacy Policy and a notice of such changes on the
                        official website. Please note that if an advertiser asks Patron to show an
                        advertisement to a certain audience or audience segment and You respond to
                        that advertisement, the advertiser or ad-server may conclude that You fit
                        the description of the audience that they were trying to reach.
                    </p>
                ),
            },
            {
                text: (
                    <p>
                        You should consult the respective privacy policies of these third-party ad
                        servers or ad networks. This Privacy Policy does not apply to, and We cannot
                        control the activities of, such other advertisers or websites.
                    </p>
                ),
            },
            {
                text: (
                    <p>
                        Except as otherwise expressly provided otherwise, this document addresses
                        only the use and disclosure of information We collect from You or that You
                        disclose to us. If You disclose Your information to others besides Patron,
                        whether they are users of the Patron Service or on other sites or services,
                        different rules may apply to their use or disclosure of the information You
                        disclose to them. Patron does not control the privacy policies of third
                        parties, and You are subject to the privacy policies of those third parties
                        where applicable. We encourage You to ask questions before You disclose Your
                        personal information to others.
                    </p>
                ),
            },
        ],
    },

    {
        title: <p>7. Data Security</p>,
        point: [
            {
                text: (
                    <p>
                        Patron uses commercially reasonable physical, managerial, and technical
                        safeguards intended to preserve the integrity and security of Your personal
                        information. We audit our procedures and security measures regularly to
                        ensure they are being properly administered and remain effective and
                        appropriate. Our Service has security measures in place to protect against
                        the loss, misuse and unauthorized alteration of the information under our
                        control.
                    </p>
                ),
            },
            {
                text: (
                    <p>
                        Please be aware that no security measures are perfect or impenetrable. No
                        data transmission over the internet or any wireless network can be
                        guaranteed to be perfectly secure. As a result, while We try to protect the
                        information We hold for You, We cannot guarantee the security of any
                        information You transmit to us and You do so at Your own risk. We cannot and
                        do not guarantee that information about You will not be accessed, disclosed,
                        altered, or destroyed by breach of any of our physical, technical, or
                        managerial safeguards.
                    </p>
                ),
            },
        ],
    },

    {
        title: <p>8. Retention of the Information</p>,
        point: [
            {
                text: (
                    <p>
                        We retain the data You provide to us for as long as You may have questions
                        or a claim in relation to our services, notwithstanding any superior
                        retention period that We may be obliged to observe in accordance with legal
                        requirements applicable to us.
                    </p>
                ),
            },
            {
                text: (
                    <p>
                        Except where prohibited by law, this period may be extended beyond the end
                        of the particular relationship with us but only for so long as We are
                        contractually bound to do so, or so far as is necessary for audit or other
                        accounting purposes. In some circumstances You can ask us to delete Your
                        data as set out below.
                    </p>
                ),
            },
            {
                text: (
                    <p>
                        When Personal Data are no longer needed We have procedures either to
                        destroy, delete, erase or convert it to an anonymous form. After You have
                        terminated Your use Services, We may store Your information in an aggregated
                        and anonymized format.
                    </p>
                ),
            },
        ],
    },

    {
        title: <p>9. Сookies</p>,
        point: [
            {
                text: (
                    <p>
                        Cookies and Automatically Collected Information: We do not track Your
                        activities using cookies and similar technologies.
                    </p>
                ),
            },
            {
                text: <p>However Patron may use automatically collected information to:</p>,
            },
            {
                text: ListText([
                    "Wallet address, date of registration",
                    "Authentication tokens, date of login",
                    "Archives with the downloaded source code and information about the tiling used for the build",
                    "WASM bytecode and JSON metadata of contracts that were created from the archives with the downloaded source code",
                    "Build logs",
                    "Logs of access to the server (IP address, User-Agent, path to which access was gained)",
                ]),
            },
        ],
    },

    {
        title: <p>10. International Transfer</p>,
        point: [
            {
                text: (
                    <p>
                        If You reside in the EU, Patron stores Your Personal Data at secure
                        locations in the EU. Our business may require us to transfer and store Your
                        Personal Data to countries outside of the European Economic Area (“EEA”),
                        including to countries that may not provide the same level of data
                        protection as Your home country. We take appropriate steps to ensure that
                        recipients of Your Personal Data are bound to duties of confidentiality and
                        We implement appropriate measures to ensure Your Personal Data will remain
                        protected in accordance with this Privacy Policy, such as standard
                        contractual clauses. When transferring personal information, We rely on
                        different adequacy measures, where the recipient is not established in a
                        country ensuring an adequate level of protection within the meaning of
                        Regulation (EU) 2016/679, such as the United States, the transfers will be
                        covered by the standard data protection clauses adopted by the European
                        Commission or by another appropriate safeguard mechanism such as the Privacy
                        Shield Framework.
                    </p>
                ),
            },
        ],
    },

    {
        title: <p>11. Changes and Updates to this Privacy Policy</p>,
        point: [
            {
                text: (
                    <p>
                        This Privacy Policy may be revised periodically without further notice to
                        You and this will be reflected by the “LAST UPDATED” date found at the top
                        of this page. Please revisit this page to stay aware of any changes. Your
                        continued use of the Patron Service constitutes Your agreement to this
                        Privacy Policy and any future revisions.
                    </p>
                ),
            },
            {
                text: (
                    <p>
                        For revisions to this Privacy Policy that may be materially less restrictive
                        on our use or disclosure of personal information You have provided to us, We
                        will make reasonable efforts to notify You and obtain Your consent before
                        implementing revisions with respect to such information.
                    </p>
                ),
            },
        ],
    },

    {
        title: <p>12. Patron Contact Information</p>,
        point: [
            {
                text: (
                    <p>
                        For any questions, inquiries, or complaints, please contact us at:{" "}
                        <span style={{ textDecoration: "underline" }}>support@patron.works</span>.
                    </p>
                ),
            },
        ],
    },
]
