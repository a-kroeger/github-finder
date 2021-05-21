import React, { Fragment, useEffect } from 'react';
import Spinner from '../layout/Spinner.js';
import Repos from '../repos/Repos.js';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const User = ({ user, loading, getUser, getUserRepos, repos, match }) => {
    
    useEffect(() => {
        getUser(match.params.login);
        getUserRepos(match.params.login);
    }, []);

        const {
            name,
            avatar_url,
            location,
            bio,
            blog,
            company,
            login,
            html_url,
            followers,
            following,
            public_repos,
            public_gists,
            hireable
        } = user;

        if (loading) return <Spinner />;

        return (
            <Fragment>
                <Link to='/' className="btn btn-light">
                    Back To Search
                </Link>
                Hireable: {'  '}
                {hireable ? (
                <i className="fas fa-check text-success"></i>
                ) : (
                <i className="fas fa-times-circle text-danger"></i>
                )}
                <div className="card grid-2">
                    <div className="all-center">
                        <img
                            src={avatar_url}
                            className="round-img"
                            alt=""
                            style={{width: '200px'}}
                        />
                        <h1>{name}</h1>
                        <p>{location}</p>
                    </div>
                    <div>
                        {bio && <div>
                            <h3>Bio</h3>
                            <p>{bio}</p>
                            </div>
                        }
                        <a href={html_url} className="btn btn-dar my-1">
                            Visit Profile On GitHub
                        </a>
                        <ul>
                            <li>
                                {login && <div>
                                    <strong>Username:</strong> {login}
                                </div>}
                            </li>
                            <li>
                                {login && <div>
                                    <strong>Company:</strong> {company}
                                </div>}
                            </li>
                            <li>
                                {login && <div>
                                    <strong>Website:</strong> <a href={blog}>{blog}</a>
                                </div>}
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="card text-center">
                    <div className="badge badge-primary">Followers: {followers}</div>
                    <div className="badge badge-success">Following: {following}</div>
                    <div className="badge badge-light">Public Repos: {public_repos}</div>
                    <div className="badge badge-dark">Public Gists: {public_gists}</div>
                </div>

                <Repos repos={repos} />
            </Fragment>
        )

}

User.propTypes = {
    loading: PropTypes.bool,
    user: PropTypes.object.isRequired,
    repos: PropTypes.array.isRequired,
    getUser: PropTypes.func.isRequired,
    getUserRepos: PropTypes.func.isRequired,
}

export default User;
