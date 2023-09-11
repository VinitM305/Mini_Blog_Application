import About from './About';
import Footer from './Footer';
import Header from './Header';
import Home from './Home';
import Missing from './Missing';
import Nav from './Nav';
import useWindowSize from './hooks/useWindowSize';
import useAxiosFetch from './hooks/useAxiosFetch';
import EditPost from './EditPost';
import NewPost from './NewPost';
import api from './api/posts';
import PostPage from './PostPage';
import {Route,Switch,useHistory} from 'react-router-dom';
import {useState, useEffect} from 'react'
import { format } from 'date-fns';
function App() {
  const [posts, setPosts] = useState([]);
  const history = useHistory();
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody,setPostBody] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editBody,setEditBody] = useState('');
  const [isLoading,setIsLoading] = useState(false);

  const handleDelete = async (id) =>{
    await api.delete(`/posts/${id}`);
    const postsList = posts.filter(post => post.id !== id);
    setPosts(postsList);
    history.push('/');
  }

  const handleEdit = async (id) =>{
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatedPost = {id,title:editTitle, datetime,body:editBody};
    try{
      const response = await api.put(`/posts/${id}`,updatedPost);
      setPosts(posts.map(post => post.id === id ? {...updatedPost} : post));
      setEditTitle('');
      setEditBody('');
      history.push('/');
    }
    catch(err){
      console.log(`Error : ${err.message}`);
    }
  }

  useEffect(() =>{
    const filteredResults = posts.filter((post) =>
      ((post.body).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase()));
      setSearchResults(filteredResults);
  },[posts,search])

  useEffect(() =>{
    setIsLoading(true);
    async function fetchPosts()
    {
      try{
        console.log("hii");
        const response = await api.get('/posts');
        setPosts(response.data);
      }catch(err){
        if(err.response){
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
        }
        else{
          console.log(`Error : ${err.message}`);
        }
      }
      finally{
        setIsLoading(false);
      }
    }
    setTimeout(() =>{
      fetchPosts();
    },2000);
  },[])

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const id = posts.length ? posts[posts.length-1].id+1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = {id,title:postTitle, datetime,body:postBody};
    const response = await api.post('./posts',newPost);
    const allPosts = [...posts,newPost];
    setPosts(allPosts);
    setPostTitle('');
    setPostBody('');
    history.push('/');
  }
  return (
    <div className="App">
      <Header title="Welcome to My BLOG" />
      <Nav search={search} setSearch={setSearch}/>
      <Switch>
        <Route exact path='/about'>
          <About/>
        </Route>
        <Route exact path='/'>
          <Home posts={searchResults}
                isLoading={isLoading}/>
        </Route>
        <Route exact path='/missing'>
          <Missing/>
        </Route>
        <Route exact path='/newpost'>
          <NewPost handleSubmit={handleSubmit} postTitle={postTitle} setPostTitle={setPostTitle} postBody={postBody} setPostBody={setPostBody}/>
        </Route>
        <Route exact path='/edit/:id'>
          <EditPost posts={posts} handleEdit={handleEdit} editTitle={editTitle} setEditTitle={setEditTitle} editBody={editBody} setEditBody={setEditBody}/>
        </Route>
        <Route exact path='/postpage/:id'>
          <PostPage posts={posts} handleDelete={handleDelete}/>
        </Route>
        <Route path="*">
          <Missing />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
