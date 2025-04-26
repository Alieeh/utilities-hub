import { domainName } from '@/routes';
import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Html,
    Img,
    Link,
    Section,
    Text,
  } from '@react-email/components';
  
  interface EmailTemplateProps {
    hrefLink?: string;
  }
  
  
  export const EmailTemplate = ({
    hrefLink,
  }: EmailTemplateProps) => (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
        <a href="https://ibb.co/mC9hsx5y">
            <Img 
            src="https://i.ibb.co/bgsNhf5v/favicon.png"
            width="212"
            height="212"
            alt="italihub"
            style={logo} 
             />
         </a>
          <Text style={tertiary}>Verify Your Email</Text>
          <Heading style={secondary}>
            Click the following button to submit your account.
          </Heading>
          <Section style={buttonContainer}>
            <Button style={button} href={hrefLink}>Verify Email</Button>
          </Section>
          <Text style={paragraph}>Not expecting this email?</Text>
          <Text style={paragraph}>
            Contact{' '}
            <Link href="contact@email.com" style={link}>
                italihub.contact@gmail.com
            </Link>{' '}
            if you did not request this code.
          </Text>
        </Container>
        <Text style={footer}>Securely powered by ItaliHub.</Text>
      </Body>
    </Html>
  );
  
  
  const main = {
    backgroundColor: '#ffffff',
    fontFamily: 'HelveticaNeue,Helvetica,Arial,sans-serif',
  };
  
  const container = {
    backgroundColor: '#ffffff',
    border: '1px solid #eee',
    borderRadius: '5px',
    boxShadow: '0 5px 10px rgba(20,50,70,.2)',
    marginTop: '20px',
    maxWidth: '360px',
    margin: '0 auto',
    padding: '68px 0 140px',
    textAlign: 'center' as const,
  };
  
  const logo = {
    margin: '0 auto',
  };
  
  const tertiary = {
    color: '#0a85ea',
    fontSize: '11px',
    fontWeight: 700,
    fontFamily: 'HelveticaNeue,Helvetica,Arial,sans-serif',
    height: '16px',
    letterSpacing: '0',
    lineHeight: '16px',
    margin: '16px 8px 8px 8px',
    textTransform: 'uppercase' as const,
    textAlign: 'center' as const,
  };
  
  const secondary = {
    color: '#000',
    display: 'inline-block',
    fontFamily: 'HelveticaNeue-Medium,Helvetica,Arial,sans-serif',
    fontSize: '20px',
    fontWeight: 500,
    lineHeight: '24px',
    marginBottom: '0',
    marginTop: '0',
    textAlign: 'center' as const,
  };
  
  const buttonContainer = {
    margin: '24px auto 40px',
    verticalAlign: 'middle',
    // width: '330px',
  };
  
  const button = {
    fontSize:'15px',
    fontWeight:'600',
    backgroundColor:'#28a745',
    color:'#fff',
    lineHeight:1.5,
    borderRadius:'0.5em',
    padding:'14px 32px',
  };
  
  const paragraph = {
    color: '#444',
    fontSize: '15px',
    fontFamily: 'HelveticaNeue,Helvetica,Arial,sans-serif',
    letterSpacing: '0',
    lineHeight: '23px',
    padding: '0 40px',
    margin: '0',
    textAlign: 'center' as const,
  };
  
  const link = {
    color: '#444',
    textDecoration: 'underline',
  };
  
  const footer = {
    color: '#000',
    fontSize: '12px',
    fontWeight: 800,
    letterSpacing: '0',
    lineHeight: '23px',
    margin: '0',
    marginTop: '20px',
    fontFamily: 'HelveticaNeue,Helvetica,Arial,sans-serif',
    textAlign: 'center' as const,
    textTransform: 'uppercase' as const,
  };
  