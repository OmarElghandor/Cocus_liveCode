export interface GitHubRepo {
  name: string;
  owner: { login: string };
  fork: boolean;
  branches_url: string;
}

export interface GitHubBranch {
  name: string;
  commit: { sha: string };
}

export interface BranchResponse {
  name: string;
  last_commit_sha: string;
}
