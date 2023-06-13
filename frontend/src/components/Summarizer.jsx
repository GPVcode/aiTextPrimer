// import { Container, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { copy, loader, tick, linkIcon } from '../assets';
// import { Form, Button, InputGroup} from 'react-bootstrap';
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
    <div className='app pt-10'>
        <h1 className='text-center head_text pb-5'><span class="underline underline-offset-3 decoration-8 gray-black dark:decoration-blue-600">AI Blog Primer</span></h1>
          <h4 className="text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
            Summarize online content with <br className='max-md:hidden' />
            <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">OpenAI GPT-4</span>
          </h4>
          <p className="text-center">Use this open-source AI content summarizer as a quick reading primer.</p>

          <form onSubmit={handleSubmit}>
            <div className='my-2' controlId='email'>
              
              <div className="d-flex align-items-center">
              <label>Input</label>
              
              <input
                type='url'
                placeholder='Paste Article Link'
                value={article.url}
                onChange={ (e) => setArticle({ ...article, url: e.target.value }) }
                required
              />
              <button type='submit' variant='primary' className='mt-3'>
              ↵
              </button>
              </div>

            </div>
          </form>

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
    </div>
  );
};

export default Summarizer;