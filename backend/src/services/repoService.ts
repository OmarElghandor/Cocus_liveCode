import axios from 'axios';
import { GitHubRepo, GitHubBranch } from '../types';



export class RepoService {

  public async getRepositories(params: { username: string }) {

    const repositories = await axios.get<GitHubRepo[]>(`https://api.github.com/users/${params.username}/repos`, {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
        ...(process.env.GITHUB_AUTH_TOKEN && { Authorization: `token ${process.env.GITHUB_AUTH_TOKEN}` })
      }
    });

    // filter out the forked repositories
    let userReposList = repositories.data.filter((repo: GitHubRepo) => {
      return repo.fork === false;
    });


    let reposPromises = await Promise.all(userReposList.map(async (repo: GitHubRepo) => {
      try {
        // Extract the branchs Urls ex: branches_url: 'https://api.github.com/repos/OmarElghandor/react/branches{/branch}
        const cleanUrl = repo.branches_url.replace('{/branch}', '');

         // Make the call using this URL
        const response = await axios.get<GitHubBranch[]>(cleanUrl);

        return {
          repository_name: repo.name,
          owner_login: repo.owner.login,
          branches: response.data.map((b: GitHubBranch) => ({
            name: b.name,
            last_commit_sha: b.commit.sha
          }))
        };
      } catch (error) {
        return null;
      }
    }));

    return reposPromises;
  }
}