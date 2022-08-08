import {Octokit} from '@octokit/core';
import readline from 'readline';
import {config} from 'dotenv';
import fs from 'fs';

async function main() {
  config();

  const octokit = new Octokit({auth: process.env.TOKEN});
  const owner = process.env.OWNER;
  const visibility = process.env.VISIBILITY;

  readline.createInterface({
    input: fs.createReadStream('repos.txt'),
    crlfDelay: Infinity,
  }).on('line', repo => changeVisibility(octokit, owner, repo, visibility));
}

/**
 * @description Change the visibility of a repository.
 *
 * @param {Octokit} client
 * @param {string} owner
 * @param {string} repo
 * @param {string} visibility
 */
function changeVisibility(client, owner, repo, visibility) {
  client.request('PATCH /repos/{owner}/{repo}', {
    owner,
    repo,
    visibility,
  }).then(res => console.info(
      'Status [' + res.status + '] : ' +
      'Changed [' + repo + '] visibility to [' + visibility + ']',
  ));
}

await main();
