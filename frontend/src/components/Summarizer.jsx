import { Container, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';
// import { copy, loader, tick, linkIcon } from '../assets';
import { Form, Button, InputGroup} from 'react-bootstrap';

const Summarizer = () => {

  const [ article, setArticle ] = useState({
    url: "",
    summary: "",
  });

  useEffect(() => {
    // GET ARTICLES FROM LOCAL STORAGE
  })

  // API request to GPT based summarizer
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit")
    // const existingArticle = allArticles.find(
    //   (item) => item.url === article.url
    // );

    // if (existingArticle) return setArticle(existingArticle);

    // const { data } = await getSummary({ articleUrl: article.url });
    // if (data?.summary) {
    //   const newArticle = { ...article, summary: data.summary };
    //   const updatedAllArticles = [newArticle, ...allArticles];

    //   // update state and local storage
    //   setArticle(newArticle);
    //   setAllArticles(updatedAllArticles);
    //   localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
    // }
  };

  return (
    <div className='py-5'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
          <h1 className='text-center mb-4'>AI Blog Primer</h1>
          <h4 className="head_text">
                Summarize Blogs with OpenAI GPT-4
          </h4>
          <p className="desc">Use this open-source AI article summarizer as a quick primer for your online reading</p>

          <h1>Submit your article link</h1>
 
          <Form onSubmit={handleSubmit}>
            <Form.Group className='my-2' controlId='email'>
              
              <InputGroup className="d-flex align-items-center">
              <Form.Label>Input</Form.Label>
              <Form.Control
                type='url'
                placeholder='Paste Article Link'
                value={article.url}
                onChange={ (e) => setArticle({ ...article, url: e.target.value }) }
                required
              />
              <Button type='submit' variant='primary' className='mt-3'>
              ↵
              </Button>
              </InputGroup>
            </Form.Group>
          </Form>

          {/* BROWSER URL HISTORY */}

          </Card>

          {/* Display Results */}
        </Container>

    </div>
  );
};

export default Summarizer;