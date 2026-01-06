import { useState, useEffect } from 'react'
import './App.css'

const BASE_URL = 'http://localhost:3000';


export interface GitHubRepo {
  repository_name: string;
  owner_login: string;
  fork: boolean;
  branches: BranchResponse[];
}

export interface BranchResponse {
  name: string;
  last_commit_sha: string;
}



function App() {
  const [name, setName] = useState('');
  const [userRepos, setuserRepos] = useState<GitHubRepo[]>([]);

  const fetchBranches = async () => {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    let url = `${BASE_URL}/repos/${name}/repositories`;
    const response = await fetch(url, { headers });
    const data = await response.json();
    setuserRepos(data as GitHubRepo[]);
  }


  const handleClick = () => {
    fetchBranches();
  }

  const handleChange = (name: string) => {
    setName(name);
  }


  return (
    <>
      <div className="card">
        <input type="text" defaultValue='write user Name' name="myInput" onChange={(e) => handleChange(e.target.value)} />

        <button onClick={() => handleClick()}>sumit button</button>

        {
          userRepos.length > 0 &&
          userRepos.map((repo: GitHubRepo) => {
            return (
              <div key={repo.repository_name} className='card' style={{ marginBottom: '10px'  , border: '1px solid #ccc'}} >
                <div key={repo.repository_name} className='card' >
                  <p>repo name : {repo.repository_name}</p>
                  <p>owner login : {repo.owner_login}</p>
                </div>

                {
                  repo.branches.map((branch: BranchResponse) => {
                    return (
                      <div key={branch.name} className='card'>
                        <p>branch name : {branch.name}</p>
                        <p>last commit : {branch.last_commit_sha}</p>
                      </div>
                    )
                  })
                }
              </div>
            )
          })
        }

      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
