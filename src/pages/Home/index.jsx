import './styles.css';
import { Component } from 'react';
import { Posts } from '../../components/Posts';
import { loadPosts } from '../../utils/load-posts';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

class Home extends Component {
    state = {
        posts: [],
        allPosts: [],
        page: 0,
        postsPerPage: 6,
        searchValue: ''
    };

    async componentDidMount() {
        const { page, postsPerPage } = this.state;
        const postsResponse = await loadPosts();
        this.setState({ 
            posts: postsResponse.slice(page, postsPerPage),
            allPosts: postsResponse
        })
    }

    loadMorePosts = () => {
        const { page, postsPerPage, posts, allPosts } = this.state;
        const nextPage = page + 1;
        this.setState({ 
            posts: posts.concat(allPosts.slice(posts.length, posts.length + postsPerPage)),
            page: nextPage
        })
    }

    handleChange = (event) => {
        const { value } = event.target;
        this.setState({ searchValue: value });
    }

    render() {
        const { posts, allPosts, searchValue } = this.state;
        const noMorePosts = (posts.length === allPosts.length);
        const filterPosts = !!searchValue ?
        allPosts.filter(post => {
            return post.title.toLowerCase().includes(searchValue.toLowerCase());
        })
        : posts;
        return (
            <section className='container'>
                <Input searchValue={searchValue} handleChange={this.handleChange}/>
                {filterPosts.length > 0 && (
                    <Posts posts={filterPosts} />
                )}
                {filterPosts.length === 0 && (
                    <h2>Post(s) não encontrado(s)</h2>
                )}
                {!searchValue && (
                    <div className='load-button'>
                        <Button
                            name="Load more posts"
                            disabled={noMorePosts}
                            onClick={this.loadMorePosts}
                        />
                    </div>
                )}
            </section>
        );
    }
}

export default Home;
