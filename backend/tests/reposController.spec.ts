import axios from 'axios';
import { RepoService } from '../src/services/repoService';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('RepoService', () => {
  let service: RepoService;
  
  beforeEach(() => {
    service = new RepoService();
    jest.clearAllMocks();
  });

  it('should return aggregated data for non-fork repositories', async () => {
    // Mock 1: Axios User Repos Response
    mockedAxios.get.mockResolvedValueOnce({
      data: [
        { name: 'repo1', owner: { login: 'user1' }, fork: false, branches_url: 'url/1{/branch}' },
        { name: 'forked-repo', owner: { login: 'user1' }, fork: true, branches_url: 'url/2{/branch}' } // Should be ignored
      ]
    });

    // Mock 2: Branches Response (only called once for repo1)
    mockedAxios.get.mockResolvedValueOnce({
      data: [
        { name: 'main', commit: { sha: '123sha' } }
      ]
    });

    const result = await service.getRepositories({ username: 'user1' });

    expect(result).toHaveLength(1);
    expect(result[0]?.repository_name).toBe('repo1');
    expect(result[0]?.branches[0]?.last_commit_sha).toBe('123sha');
    expect(mockedAxios.get).toHaveBeenCalledTimes(2); // 1 for repos, 1 for branches
  });

  it('should handle errors when fetching branches', async () => {
    // Mock Axios User Repos Response
    mockedAxios.get.mockResolvedValueOnce({
      data: [
        { name: 'repo1', owner: { login: 'user1' }, fork: false, branches_url: 'url/1{/branch}' }
      ]
    });

    // Mock axios to throw error for branches
    mockedAxios.get.mockRejectedValueOnce(new Error('Branch fetch failed'));

    const result = await service.getRepositories({ username: 'user1' });

    expect(result).toHaveLength(1);
    expect(result[0]).toBeNull(); // Error case returns null
  });
});