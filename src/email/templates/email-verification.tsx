import { GetSubject, GetTemplate, GetTemplateProps } from "keycloakify-emails";
import { createVariablesHelper } from "keycloakify-emails/variables";
import {
    Body,
    Button,
    Container,
    Head,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
    render
} from "jsx-email";

// ✅ Persist your interface
export interface TemplateProps extends Omit<GetTemplateProps, "plainText"> {
    email?: string;
    name?: string;
}

const main = {
    backgroundImage:
        "url('https://auth.humat.io/resources/mfilv/login/keycloakify-starter/dist/assets/background-BwbW-1cU.jpg')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    padding: "40px 0",
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
    color: "white"
};

const container = {
    backgroundColor: "#000000a1",
    margin: "0 auto",
    marginBottom: "64px",
    padding: "20px 0 48px",
    maxWidth: "600px",
    borderRadius: "8px"
};

const box = {
    padding: "0 48px"
};

const logo = {
    display: "block",
    margin: "0 auto 20px auto",
    maxWidth: "160px"
};

// used by Preview App of jsx-email
export const previewProps: TemplateProps = {
    locale: "en",
    themeName: "vanilla"
};

export const templateName = "Email Verification";

// ✅ Use Keycloak variables
const { exp } = createVariablesHelper("email-verification.ftl");

export const Template = ({ locale }: TemplateProps) => (
    <Html lang={locale}>
        <Head />
        <Preview>
            Verify your account, {exp("user.firstName")} {exp("user.lastName")}
        </Preview>
        <Body style={main}>
            <Container style={container}>
                <Section style={box}>
                    <Img
                        src="https://auth.humat.io/resources/mfilv/login/keycloakify-starter/dist/assets/logo-Chztf82F.png"
                        alt={`${exp("realmName")} Logo`}
                        style={logo}
                    />

                    <Text>Hello {exp("user.firstName")},</Text>

                    <Text>
                        You recently registered for <strong>Humat</strong> using{" "}
                        <strong>{exp("user.email")}</strong>. To complete your
                        registration, please verify your email address by clicking the
                        button below:
                    </Text>

                    <Button
                        align="center"
                        backgroundColor="#0069d9"
                        borderRadius={5}
                        fontSize={16}
                        height={50}
                        href={exp("link")}
                        textColor="#fff"
                        width={220}
                    >
                        Verify Email
                    </Button>

                    <Hr />

                    <Text>
                        If the button above doesn’t work, copy and paste this link into
                        your browser:
                    </Text>
                    <Link
                        style={{
                            wordBreak: "break-all",
                            overflowWrap: "break-word",
                            color: "#4da6ff",
                            fontSize: 10
                        }}
                        href={exp("link")}
                    >
                        {exp("link")}
                    </Link>

                    <Hr />

                    <Text>This link will expire within 10 minutes.</Text>

                    <Text>
                        If you did not sign up for Humat, you can safely ignore this
                        email.
                    </Text>
                </Section>
            </Container>
        </Body>
    </Html>
);

export const getTemplate: GetTemplate = async props => {
    return await render(<Template {...props} />, { plainText: props.plainText });
};

export const getSubject: GetSubject = async () => {
    return `HUMAT | Verify email`;
};
