import { Container, Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Hero = () => {
  return (
    <div className='py-5'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
          <h1 className='text-center mb-4'>AI Blog Primer</h1>
          <h4 className="head_text">
                Summarize Articles with OpenAI GPT-4
          </h4>
          <p className="desc">Generate article summaries as a primer for your readings by using this open-source AI article summarizer.</p>
          <div className='d-flex'>
            <LinkContainer to='/login'>
              <Button variant='primary' className='me-3'>
                Sign In
              </Button>
            </LinkContainer>
            <LinkContainer to='/register'>
              <Button variant='secondary'>
                Register
              </Button>
            </LinkContainer>
            
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Hero;