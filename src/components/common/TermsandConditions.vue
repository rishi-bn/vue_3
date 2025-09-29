<template>
  <v-dialog v-model="dialog" max-width="800px">
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        <h4 color="blue">Terms and Conditions</h4>
        <v-btn icon="mdi-close" variant="text" color="blue" @click="dialog = false"></v-btn>
      </v-card-title>
      <v-divider></v-divider>
        <v-card-text class="pa-4">
        <section class="header">
          <h5 class="text-caption black--text font-weight-medium mb-2">
            VIRTUELE END USER LICENSE AGREEMENT (EULA)
          </h5>
          <h5 class="text-caption black--text font-weight-medium mb-2">
            Effective Date: [01/01/2025]
          </h5>
        </section>
        <section class="content py-2">
          <section class="content-block mb-4">
            <h5 class="text-caption black--text font-weight-medium mb-1">
              1. AGREEMENT TO TERMS
            </h5>
            <p class="text-caption black--text font-weight-regular mb-2">
              This End User License Agreement ("Agreement") is a legal agreement
              between you ("User" or "You") and VIRTUELE, Inc. ("VIRTUELE,"
              "Company," "We," "Us," or "Our") governing your use of the
              VIRTUELE cloud-based software-as-a-service platform, including any
              associated software, documentation, websites, and services
              ("Services").
            </p>
            <p class="text-caption black--text font-weight-regular mb-2">
              By clicking "I Accept" or by accessing or using the Services, you
              acknowledge that you have read, understood, and agree to be bound
              by this Agreement. If you do not agree, do not use the Services.
            </p>
          </section>
          <section class="content-block mb-4">
            <h5 class="text-caption black--text font-weight-medium mb-2">
              2. GRANT OF LICENSE AND RESTRICTIONS
            </h5>
            <section class="content-sub-block pl-2 mb-3">
              <h5 class="text-caption black--text font-weight-medium mb-1">
                2.1 License Grant
              </h5>
              <p class="text-caption black--text font-weight-regular mb-2">
                VIRTUELE grants you a non-exclusive, non-transferable,
                revocable, limited license to access and use the Services for
                your internal business purposes, subject to compliance with this
                Agreement.
              </p>
            </section>
            <section class="content-sub-block pl-2">
              <h5 class="text-caption black--text font-weight-medium mb-1">
                2.1 License Restrictions
              </h5>
              <h5 class="text-caption black--text font-weight-medium mb-2">
                You may not:
              </h5>
              <p class="text-caption black--text font-weight-regular mb-1 pl-4">
                • Rent, lease, sublicense, sell, assign, distribute, or transfer
                access to the Services.
              </p>
              <p class="text-caption black--text font-weight-regular mb-1 pl-4">
                • Reverse engineer, decompile, or disassemble any part of the
                Services.
              </p>
              <p class="text-caption black--text font-weight-regular mb-1 pl-4">
                • Modify, copy, or create derivative works based on the
                Services.
              </p>
              <p class="text-caption black--text font-weight-regular mb-1 pl-4">
                • Circumvent security features or attempt unauthorized access.
              </p>
              <p class="text-caption black--text font-weight-regular mb-1 pl-4">
                • Use the Services in violation of applicable laws, including
                data protection laws.
              </p>
              <p class="text-caption black--text font-weight-regular mb-1 pl-4">
                • Engage in activities that compromise the integrity, security,
                or performance of the Services.
              </p>
            </section>
          </section>
          <section class="content-block mb-4">
            <h5 class="text-caption black--text font-weight-medium mb-2">
              3. ACCOUNT REGISTRATION AND RESPONSIBILITIES
            </h5>
            <section class="content-sub-block pl-2 mb-3">
              <h5 class="text-caption black--text font-weight-medium mb-1">
                3.1 Account Creation
              </h5>
              <p class="text-caption black--text font-weight-regular mb-2">
                To use the Services, you must create an account and provide
                accurate, complete, and up-to-date information. You are
                responsible for maintaining the confidentiality of your
                credentials.
              </p>
            </section>
            <section class="content-sub-block pl-2">
              <h5 class="text-caption black--text font-weight-medium mb-1">
                3.2 Unauthorized Access
              </h5>
              <p class="text-caption black--text font-weight-regular mb-2">
                You are responsible for all activity conducted under your
                account. If you suspect unauthorized use, you must notify
                VIRTUELE immediately.
              </p>
            </section>
          </section>
          <section class="content-block mb-4">
            <h5 class="text-caption black--text font-weight-medium mb-2">
              4. DATA PRIVACY AND SECURITY
            </h5>
            <section class="content-sub-block pl-2 mb-3">
              <h5 class="text-caption black--text font-weight-medium mb-1">
                4.1 Data Ownership
              </h5>
              <p class="text-caption black--text font-weight-regular mb-2">
                You retain all rights to the data you upload to the Services
                ("User Data"). By using the Services, you grant VIRTUELE a l
                license to process User Data as required to operate the
                Services.
              </p>
            </section>
            <section class="content-sub-block pl-2 mb-3">
              <h5 class="text-caption black--text font-weight-medium mb-1">
                4.2 Data Protection
              </h5>
              <p class="text-caption black--text font-weight-regular mb-2">
                VIRTUELE implements industry-standard security measures,
                including encryption and access controls, but does not guarantee
                that User Data will not be subject to unauthorized access, loss,
                or corruption.
              </p>
            </section>
            <section class="content-sub-block pl-2">
              <h5 class="text-caption black--text font-weight-medium mb-1">
                4.3 Compliance with Laws
              </h5>
              <p class="text-caption black--text font-weight-regular mb-2">
                You are responsible for ensuring your use of the Services
                complies with applicable data protection regulations, including
                GDPR, CCPA, and other privacy laws.
              </p>
            </section>
          </section>
          <section class="content-block mb-4">
            <h5 class="text-caption black--text font-weight-medium mb-2">
              5. SERVICE AVAILABILITY, MODIFICATIONS, AND SUPPORT
            </h5>
            <section class="content-sub-block pl-2 mb-3">
              <h5 class="text-caption black--text font-weight-medium mb-1">
                5.1 Service Uptime
              </h5>
              <p class="text-caption black--text font-weight-regular mb-2">
                VIRTUELE aims to provide 99.9% uptime, excluding scheduled
                maintenance and force majeure events.
              </p>
            </section>
            <section class="content-sub-block pl-2 mb-3">
              <h5 class="text-caption black--text font-weight-medium mb-1">
                5.2 Modifications
              </h5>
              <p class="text-caption black--text font-weight-regular mb-2">
                We reserve the right to update, modify, or discontinue the
                Services at our discretion. Continued use after changes
                constitutes acceptance.
              </p>
            </section>
            <section class="content-sub-block pl-2">
              <h5 class="text-caption black--text font-weight-medium mb-1">
                5.3 Support Services
              </h5>
              <p class="text-caption black--text font-weight-regular mb-2">
                VIRTUELE offers standard support through email, chat, and
                ticketing systems. Premium support options may be available
                under separate agreements.
              </p>
            </section>
          </section>
          <section class="content-block mb-4">
            <h5 class="text-caption black--text font-weight-medium mb-2">
              6. SUBSCRIPTION FEES, BILLING, AND TERMINATION
            </h5>
            <section class="content-sub-block pl-2 mb-3">
              <h5 class="text-caption black--text font-weight-medium mb-1">
                6.1 Fees and Payment
              </h5>
              <p class="text-caption black--text font-weight-regular mb-2">
                The Services may be subject to subscription fees as outlined in
                your agreement. All payments are non-refundable unless required
                by law.
              </p>
            </section>
            <section class="content-sub-block pl-2 mb-3">
              <h5 class="text-caption black--text font-weight-medium mb-1">
                6.2 Termination by VIRTUELE
              </h5>
              <p class="text-caption black--text font-weight-regular mb-2">
                We may suspend or terminate your access if you violate this
                Agreement, fail to pay applicable fees, or engage in
                unauthorized activities.
              </p>
            </section>
            <section class="content-sub-block pl-2">
              <h5 class="text-caption black--text font-weight-medium mb-1">
                6.3 Termination by User
              </h5>
              <p class="text-caption black--text font-weight-regular mb-2">
                You may terminate your account at any time by providing written
                notice. However, you remain responsible for outstanding
                payments.
              </p>
            </section>
          </section>
          <section class="content-block mb-4">
            <h5 class="text-caption black--text font-weight-medium mb-2">
              7. THIRD-PARTY INTEGRATIONS AND SERVICES
            </h5>
            <section class="content-sub-block pl-2 mb-3">
              <h5 class="text-caption black--text font-weight-medium mb-1">
                7.1 Use of Third-Party Services
              </h5>
              <p class="text-caption black--text font-weight-regular mb-2">
                The Services may integrate with third-party software or
                platforms. VIRTUELE is not responsible for the availability,
                security, or policies of third-party services.
              </p>
            </section>
            <section class="content-sub-block pl-2">
              <h5 class="text-caption black--text font-weight-medium mb-1">
                7.2 Liability for Third-Party Content
              </h5>
              <p class="text-caption black--text font-weight-regular mb-2">
                We disclaim all liability for any third-party content accessed
                through the Services. Your use of third-party services is at
                your own risk.
              </p>
            </section>
          </section>
          <section class="content-block mb-4">
            <h5 class="text-caption black--text font-weight-medium mb-2">
              8. INTELLECTUAL PROPERTY RIGHTS
            </h5>
            <section class="content-sub-block pl-2 mb-3">
              <h5 class="text-caption black--text font-weight-medium mb-1">
                8.1 Ownership
              </h5>
              <p class="text-caption black--text font-weight-regular mb-2">
                All intellectual property in the Services, including software,
                trademarks, and content, is owned by VIRTUELE or its licensors.
              </p>
            </section>
            <section class="content-sub-block pl-2">
              <h5 class="text-caption black--text font-weight-medium mb-1">
                8.2 User Feedback
              </h5>
              <p class="text-caption black--text font-weight-regular mb-2">
                If you provide suggestions, improvements, or feedback, you grant
                VIRTUELE a royalty-free, perpetual, and irrevocable license to
                use such feedback without compensation.
              </p>
            </section>
          </section>
          <section class="content-block mb-4">
            <h5 class="text-caption black--text font-weight-medium mb-2">
              9. DISCLAIMERS AND LIMITATION OF LIABILITY
            </h5>
            <section class="content-sub-block pl-2 mb-3">
              <h5 class="text-caption black--text font-weight-medium mb-1">
                9.1 Disclaimer of Warranties
              </h5>
              <p class="text-caption black--text font-weight-regular mb-2">
                THE SERVICES ARE PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY
                KIND, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR
                PURPOSE, OR NON-INFRINGEMENT.
              </p>
            </section>
            <section class="content-sub-block pl-2">
              <h5 class="text-caption black--text font-weight-medium mb-1">
                9.2 Limitation of Liability
              </h5>
              <h5 class="text-caption black--text font-weight-medium mb-2">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW:
              </h5>
              <p class="text-caption black--text font-weight-regular mb-1 pl-4">
                • VIRTUELE SHALL NOT BE LIABLE FOR INDIRECT, INCIDENTAL,
                CONSEQUENTIAL, OR SPECIAL DAMAGES ARISING OUT OF OR RELATED TO
                YOUR USE OF THE SERVICES.
              </p>
              <p class="text-caption black--text font-weight-regular mb-1 pl-4">
                • VIRTUELE’S TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT PAID BY
                YOU IN THE LAST 12 MONTHS.
              </p>
            </section>
          </section>
          <section class="content-block mb-4">
            <h5 class="text-caption black--text font-weight-medium mb-2">
              10. GENERAL TERMS
            </h5>
            <section class="content-sub-block pl-2 mb-3">
              <h5 class="text-caption black--text font-weight-medium mb-1">
                10.1 Governing Law
              </h5>
              <p class="text-caption black--text font-weight-regular mb-2">
                This Agreement shall be governed by the laws of [State/Country],
                without regard to conflict of law principles.
              </p>
            </section>
            <section class="content-sub-block pl-2 mb-3">
              <h5 class="text-caption black--text font-weight-medium mb-1">
                10.2 Dispute Resolution
              </h5>
              <p class="text-caption black--text font-weight-regular mb-2">
                All disputes shall be resolved through binding arbitration in
                [San Jose, CA], except where prohibited by law.
              </p>
            </section>
            <section class="content-sub-block pl-2 mb-3">
              <h5 class="text-caption black--text font-weight-medium mb-1">
                10.3 Force Majeure
              </h5>
              <p class="text-caption black--text font-weight-regular mb-2">
                VIRTUELE shall not be liable for failure to perform due to
                causes beyond our reasonable control, including cyberattacks,
                natural disasters, or regulatory restrictions.
              </p>
            </section>
            <section class="content-sub-block pl-2">
              <h5 class="text-caption black--text font-weight-medium mb-1">
                10.4 Amendments
              </h5>
              <p class="text-caption black--text font-weight-regular mb-2">
                VIRTUELE reserves the right to update this Agreement at any
                time. Continued use of the Services after modifications
                constitutes acceptance.
              </p>
            </section>
          </section>
          <section class="content-block">
            <h5 class="text-caption black--text font-weight-medium mb-2">
              11. CONTACT INFORMATION
            </h5>
            <section class="content-sub-block pl-2">
              <p class="text-caption black--text font-weight-regular mb-2">
                For any questions regarding this Agreement, contact: Email:
                [support@virtuele.com]
              </p>
              <p class="text-caption black--text font-weight-regular mb-2">
                By using the VIRTUELE Services, you acknowledge that you have
                read, understood, and agreed to be bound by this Agreement.
              </p>
            </section>
          </section>
        </section>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<!-- <script>
export default {
  name: "TermsandConditions",
  data() {
    return {
      termsConditionDialog: false,
    };
  },
  methods: {
    viewDialog() {
      this.termsConditionDialog = true;
    },
    resetPrompt() {
      this.termsConditionDialog = false;
    },
  },
};
</script> -->


<script lang="ts" setup>

const dialog = defineModel<boolean>();
</script>

