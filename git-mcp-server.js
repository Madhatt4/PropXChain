#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} from '@modelcontextprotocol/sdk/types.js';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

class GitMcpServer {
  constructor() {
    this.server = new Server(
      {
        name: 'git-mcp-server',
        version: '0.1.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();
    
    // Error handling
    this.server.onerror = (error) => console.error('[MCP Error]', error);
    process.on('SIGINT', async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  setupToolHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'git_push',
          description: 'Push changes to a GitHub repository',
          inputSchema: {
            type: 'object',
            properties: {
              repo_path: {
                type: 'string',
                description: 'Path to the Git repository',
              },
              branch: {
                type: 'string',
                description: 'Branch to push to',
              },
              remote: {
                type: 'string',
                description: 'Remote name',
                default: 'origin',
              },
            },
            required: ['repo_path', 'branch'],
          },
        },
        {
          name: 'git_merge',
          description: 'Merge one branch into another',
          inputSchema: {
            type: 'object',
            properties: {
              repo_path: {
                type: 'string',
                description: 'Path to the Git repository',
              },
              source_branch: {
                type: 'string',
                description: 'Source branch to merge from',
              },
              target_branch: {
                type: 'string',
                description: 'Target branch to merge into',
              },
              allow_unrelated_histories: {
                type: 'boolean',
                description: 'Allow merging unrelated histories',
                default: false,
              },
            },
            required: ['repo_path', 'source_branch', 'target_branch'],
          },
        },
        {
          name: 'git_checkout',
          description: 'Checkout a branch',
          inputSchema: {
            type: 'object',
            properties: {
              repo_path: {
                type: 'string',
                description: 'Path to the Git repository',
              },
              branch: {
                type: 'string',
                description: 'Branch to checkout',
              },
              create: {
                type: 'boolean',
                description: 'Create the branch if it does not exist',
                default: false,
              },
            },
            required: ['repo_path', 'branch'],
          },
        },
        {
          name: 'git_add',
          description: 'Add files to the staging area',
          inputSchema: {
            type: 'object',
            properties: {
              repo_path: {
                type: 'string',
                description: 'Path to the Git repository',
              },
              files: {
                type: 'array',
                items: {
                  type: 'string',
                },
                description: 'Files to add',
              },
            },
            required: ['repo_path', 'files'],
          },
        },
        {
          name: 'git_commit',
          description: 'Commit changes',
          inputSchema: {
            type: 'object',
            properties: {
              repo_path: {
                type: 'string',
                description: 'Path to the Git repository',
              },
              message: {
                type: 'string',
                description: 'Commit message',
              },
            },
            required: ['repo_path', 'message'],
          },
        },
      ],
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      switch (request.params.name) {
        case 'git_push':
          return this.gitPush(request.params.arguments);
        case 'git_merge':
          return this.gitMerge(request.params.arguments);
        case 'git_checkout':
          return this.gitCheckout(request.params.arguments);
        case 'git_add':
          return this.gitAdd(request.params.arguments);
        case 'git_commit':
          return this.gitCommit(request.params.arguments);
        default:
          throw new McpError(
            ErrorCode.MethodNotFound,
            `Unknown tool: ${request.params.name}`
          );
      }
    });
  }

  async gitPush(args) {
    try {
      const { repo_path, branch, remote = 'origin' } = args;
      const command = `cd ${repo_path} && git push ${remote} ${branch}`;
      const { stdout, stderr } = await execAsync(command);
      return {
        content: [
          {
            type: 'text',
            text: `${stdout}\n${stderr}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error: ${error.message}`,
          },
        ],
        isError: true,
      };
    }
  }

  async gitMerge(args) {
    try {
      const { repo_path, source_branch, target_branch, allow_unrelated_histories = false } = args;
      const unrelatedFlag = allow_unrelated_histories ? '--allow-unrelated-histories' : '';
      const command = `cd ${repo_path} && git checkout ${target_branch} && git merge ${unrelatedFlag} ${source_branch}`;
      const { stdout, stderr } = await execAsync(command);
      return {
        content: [
          {
            type: 'text',
            text: `${stdout}\n${stderr}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error: ${error.message}`,
          },
        ],
        isError: true,
      };
    }
  }

  async gitCheckout(args) {
    try {
      const { repo_path, branch, create = false } = args;
      const createFlag = create ? '-b' : '';
      const command = `cd ${repo_path} && git checkout ${createFlag} ${branch}`;
      const { stdout, stderr } = await execAsync(command);
      return {
        content: [
          {
            type: 'text',
            text: `${stdout}\n${stderr}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error: ${error.message}`,
          },
        ],
        isError: true,
      };
    }
  }

  async gitAdd(args) {
    try {
      const { repo_path, files } = args;
      const filesList = files.join(' ');
      const command = `cd ${repo_path} && git add ${filesList}`;
      const { stdout, stderr } = await execAsync(command);
      return {
        content: [
          {
            type: 'text',
            text: `${stdout}\n${stderr}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error: ${error.message}`,
          },
        ],
        isError: true,
      };
    }
  }

  async gitCommit(args) {
    try {
      const { repo_path, message } = args;
      const command = `cd ${repo_path} && git commit -m "${message}"`;
      const { stdout, stderr } = await execAsync(command);
      return {
        content: [
          {
            type: 'text',
            text: `${stdout}\n${stderr}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error: ${error.message}`,
          },
        ],
        isError: true,
      };
    }
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Git MCP server running on stdio');
  }
}

const server = new GitMcpServer();
server.run().catch(console.error);
