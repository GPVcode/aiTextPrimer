import { Container, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { copy, loader, tick, linkIcon } from '../assets';
import { Form, Button, InputGroup} from 'react-bootstrap';
import { useLazyGetSummaryQuery } from '../slices/articleApi';

const Summarizer = () => {

  const [ article, setArticle ] = useState({
    url: "",
    summary: "",
  });

  //  after setting new article, push it to all articles array.
  const [allarticles, setAllArticles] = useState([]);

  const [ copied, setCopied ] = useState("");

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  // useEffect hook is used to store articles in local storage
  useEffect(() => {
    // get data and store in variable
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem('articles')
    )
    console.log("articlesfromSTORAGE", articlesFromLocalStorage)
    if(articlesFromLocalStorage){
      setAllArticles(articlesFromLocalStorage)
    }
  }, []); // empty dep array to execute hook as soon as page loads

  // API request to GPT based summarizer
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await getSummary({ articleUrl: article.url });

    if(data?.summary){
      const newArticle = { ...article, summary: data.summary };
      
      const updatedAllArticles = [newArticle, ...allarticles];

      setArticle(newArticle);
      setAllArticles(updatedAllArticles);

      // update local storage
      localStorage.setItem('articles', JSON.stringify(updatedAllArticles))

      console.log("newArticle", newArticle)
    }
  };

  // autocopy icon functionality
  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    // built in and makes copy button work
    navigator.clipboard.writeText(copyUrl);
    // show successful animation
    setTimeout(() => setCopied(false), 3000)
  }
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

          <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>
            { allarticles.map((item, index) => (
              <div
                key={`link-${index}`}
                onClick={() => setArticle(item)} 
                className="link_card"
              >
                <div className="copy_btn" onClick={() => handleCopy(item.url)}>
                  <img 
                    src={copied === item.url ? tick : copy} 
                    className='w-[40%] h-[40%] object-contain'
                    alt='copy_icon'
                  />
                </div>
                <p className='flex-1 fot-satoshi text-blue-700 font-medium text-sm truncate'>
                  {item.url}
                </p>
              </div>
            ))}
          </div>

          {/* Display Results */}
          <div className='my-10 max-w-full flex justify-center items-center'>
            {isFetching ? (
              <img src={loader} alt='loader' className='w-20 h-20 object-contain' />
                ) : error ? (
              <p className='font-inter font-bold text-black text-center'>
                Well, that wasn't supposed to happen...
                <br />
                <span className='font-satoshi font-normal text-gray-700'>
                  {error?.data?.error}
                </span>
              </p>
              ) : (
              article.summary && (
                <div className='flex flex-col gap-3'>
                  <h2 className='font-satoshi font-bold text-gray-600 text-xl'>
                    Article <span className='blue_gradient'>Summary</span>
                  </h2>
                  <div className='summary_box'>
                    <p className='font-inter font-medium text-sm text-gray-700'>
                      {article.summary}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>

          </Card>
        </Container>

    </div>
  );
};

export default Summarizer;