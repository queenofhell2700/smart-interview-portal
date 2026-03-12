const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Question = require('./models/Question');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const questions = [
  // --- Data Structures ---
  {
    title: 'Reverse a Linked List',
    category: 'data-structures',
    difficulty: 'Easy',
    description: 'Given the head of a singly linked list, reverse the list, and return the reversed list.',
    solution: 'function reverseList(head) {\n  let prev = null;\n  let current = head;\n  while (current) {\n    let nextTemp = current.next;\n    current.next = prev;\n    prev = current;\n    current = nextTemp;\n  }\n  return prev;\n}'
  },
  {
    title: 'Validate Binary Search Tree',
    category: 'data-structures',
    difficulty: 'Medium',
    description: 'Given the root of a binary tree, determine if it is a valid binary search tree (BST).',
    solution: 'function isValidBST(root, min = null, max = null) {\n  if (!root) return true;\n  if ((min !== null && root.val <= min) || (max !== null && root.val >= max)) return false;\n  return isValidBST(root.left, min, root.val) && isValidBST(root.right, root.val, max);\n}'
  },
  {
    title: 'Path Sum',
    category: 'data-structures',
    difficulty: 'Easy',
    description: 'Given the root of a binary tree and an integer targetSum, return true if the tree has a root-to-leaf path such that adding up all the values along the path equals targetSum.',
    solution: 'function hasPathSum(root, targetSum) {\n  if (!root) return false;\n  if (!root.left && !root.right) return targetSum === root.val;\n  return hasPathSum(root.left, targetSum - root.val) || hasPathSum(root.right, targetSum - root.val);\n}'
  },
  {
    title: 'Implement Queue using Stacks',
    category: 'data-structures',
    difficulty: 'Easy',
    description: 'Implement a first in first out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (push, peek, pop, and empty).',
    solution: 'class MyQueue {\n  constructor() {\n    this.stack1 = [];\n    this.stack2 = [];\n  }\n  push(x) {\n    this.stack1.push(x);\n  }\n  pop() {\n    this.peek();\n    return this.stack2.pop();\n  }\n  peek() {\n    if (this.stack2.length === 0) {\n      while (this.stack1.length > 0) this.stack2.push(this.stack1.pop());\n    }\n    return this.stack2[this.stack2.length - 1];\n  }\n  empty() {\n    return this.stack1.length === 0 && this.stack2.length === 0;\n  }\n}'
  },
  {
    title: 'Merge K Sorted Lists',
    category: 'data-structures',
    difficulty: 'Hard',
    description: 'You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.',
    solution: 'Use a Min-Priority Queue to keep track of the heads of all k lists. \n1. Push the head of each non-empty list into the priority queue.\n2. In a loop, extract the minimum node from the queue, append it to the result list, and push its next node back into the queue if it exists.\n3. Time Complexity: O(N log k) where N is the total number of nodes.'
  },

  // --- Algorithms (General / Logic) ---
  {
    title: 'Two Sum',
    category: 'algorithms',
    difficulty: 'Easy',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    solution: 'function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) return [map.get(complement), i];\n    map.set(nums[i], i);\n  }\n  return [];\n}'
  },
  {
    title: 'Longest Substring Without Repeating Characters',
    category: 'algorithms',
    difficulty: 'Medium',
    description: 'Given a string s, find the length of the longest substring without repeating characters.',
    solution: 'function lengthOfLongestSubstring(s) {\n  let maxLen = 0, start = 0, map = new Map();\n  for (let end = 0; end < s.length; end++) {\n    if (map.has(s[end])) start = Math.max(map.get(s[end]) + 1, start);\n    map.set(s[end], end);\n    maxLen = Math.max(maxLen, end - start + 1);\n  }\n  return maxLen;\n}'
  },
  {
    title: 'Trapping Rain Water',
    category: 'algorithms',
    difficulty: 'Hard',
    description: 'Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.',
    solution: 'Use a two-pointer approach.\n1. Initialize left=0, right=n-1, left_max=0, right_max=0.\n2. While left < right:\n   - If height[left] < height[right]:\n     - If height[left] >= left_max, left_max = height[left].\n     - Else, water += left_max - height[left].\n     - left++.\n   - Else:\n     - If height[right] >= right_max, right_max = height[right].\n     - Else, water += right_max - height[right].\n     - right--.'
  },
  {
    title: 'Find First and Last Position of Element in Sorted Array',
    category: 'algorithms',
    difficulty: 'Medium',
    description: 'Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value.',
    solution: 'Perform two binary searches:\n1. Find the first occurrence of target.\n2. Find the last occurrence of target.\nTime complexity: O(log n).'
  },
  {
    title: 'Climbing Stairs',
    category: 'algorithms',
    difficulty: 'Easy',
    description: 'You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
    solution: 'This is a Fibonacci sequence problem.\nfunction climbStairs(n) {\n  if (n <= 2) return n;\n  let first = 1, second = 2;\n  for (let i = 3; i <= n; i++) {\n    let third = first + second;\n    first = second;\n    second = third;\n  }\n  return second;\n}'
  },

  // --- System Design ---
  {
    title: 'Design Rate Limiter',
    category: 'system-design',
    difficulty: 'Medium',
    description: 'Design a rate limiter that controls the rate of traffic sent by a client or a service.',
    solution: 'Key components to discuss:\n1. Algorithms: Token Bucket, Leaking Bucket, Fixed Window, Sliding Window Log, Sliding Window Counter.\n2. High-level architecture: Client -> API Gateway (Rate Limiter) -> Application Servers.\n3. Data Store: Redis (INCR, EXPIRE commands) is preferred for fast atomic operations.'
  },
  {
    title: 'Design URL Shortener (TinyURL)',
    category: 'system-design',
    difficulty: 'Medium',
    description: 'Design a service like TinyURL that creates shorter aliases for long URLs.',
    solution: '1. Goals: Shorten URL, Fast Redirect (301 Move Permanently), High Availability.\n2. Estimation: 100M new URLs/month. Read/Write ratio (10:1).\n3. Database: NoSQL (Cassandra/MongoDB) for scalability. Key-value store.\n4. Shortening Logic: Base62 encoding of an auto-incrementing ID. Collision handling if using hashing (MD5).'
  },
  {
    title: 'Design Netflix / YouTube',
    category: 'system-design',
    difficulty: 'Hard',
    description: 'Design a video streaming service that can handle millions of concurrent users.',
    solution: '1. Content Upload: App Server -> S3 (Original) -> Transcoder (Multiple bitrates/resolutions) -> S3 (Processed).\n2. Delivery: Content Delivery Network (CDN) for low latency.\n3. Scalability: Microservices for Auth, Billing, Recommendation, Search.\n4. Database: Polyglot persistence. Cassandra for user views, ElasticSearch for search, Redis for caching.'
  },
  {
    title: 'Design WhatsApp / Messenger',
    category: 'system-design',
    difficulty: 'Hard',
    description: 'Design a highly available and scalable real-time messaging service.',
    solution: '1. Protocol: WebSockets or XMPP for real-time bi-directional communication.\n2. Messaging: Use a Message Queue (Kafka/RabbitMQ) for decoupling.\n3. Presence: ZooKeeper or Redis to track "Online/Offline" status.\n4. Storage: HBase or Cassandra for massive message history storage due to write-heavy nature.'
  },
  {
    title: 'Consistent Hashing',
    category: 'system-design',
    difficulty: 'Medium',
    description: 'Explain consistent hashing and why it is useful in system design.',
    solution: '1. Problem: Traditional hashing (hash(key) % N) causes reshuffling of all keys when N changes.\n2. Consistent Hashing: Map keys and servers to a logical ring. A key is assigned to the first server it encounters clockwise.\n3. Impact: Adding/removing a node only affects k/N keys. Useful for load balancing and distributed caching (Memcached).'
  },

  // --- Aptitude & Logic ---
  {
    title: 'The Burning Ropes',
    category: 'aptitude',
    difficulty: 'Medium',
    description: 'You have two ropes, each of which takes exactly 60 minutes to burn completely. However, they burn unevenly. How do you measure exactly 45 minutes?',
    solution: '1. Light Rope A at both ends, and light Rope B at one end.\n2. When Rope A burns out (30 mins), light the other end of Rope B.\n3. Rope B will burn out in another 15 minutes.\nTotal = 30 + 15 = 45 minutes.'
  },
  {
    title: 'Blindfolded Coin Flip',
    category: 'aptitude',
    difficulty: 'Hard',
    description: 'You are blindfolded and there are 100 coins on a table. 10 are heads up and 90 are tails up. You need to divide them into two piles such that each pile has the same number of heads up coins.',
    solution: '1. Make two piles: Pile 1 with 10 coins and Pile 2 with 90 coins.\n2. Flip all 10 coins in Pile 1.\n3. Now both piles will have the same number of heads. \nProof: If Pile 1 had H heads originally, it now has 10-H heads after flipping. Pile 2 had 10-H heads (since total heads was 10). Both match!'
  },
  {
    title: 'The Bridge Crossing',
    category: 'aptitude',
    difficulty: 'Medium',
    description: 'Four people must cross a dark bridge. It can only hold two people at a time. They have one torch. Crossing speeds: Person A (1 min), B (2 mins), C (5 mins), D (10 mins). What is the minimum time needed?',
    solution: '1. A & B go across (2 min). A returns (1 min). Total=3.\n2. C & D go across (10 min). B returns (2 min). Total=15.\n3. A & B go across (2 min). Total = 17 minutes.'
  },
  {
    title: '3 Switches & 3 Lightbulbs',
    category: 'aptitude',
    difficulty: 'Easy',
    description: 'There are 3 switches outside a closed room. Inside the room, there are 3 lightbulbs. Each switch controls one bulb. You can go inside the room only once. How do you determine which switch controls which bulb?',
    solution: '1. Turn on Switch 1 for 10 minutes, then turn it off.\n2. Turn on Switch 2 and immediately enter the room.\n- The bulb that is ON is Switch 2.\n- The bulb that is OFF but HOT is Switch 1.\n- The bulb that is OFF and COLD is Switch 3.'
  },
  {
    title: '9 Balls Weigher',
    category: 'aptitude',
    difficulty: 'Medium',
    description: 'You have 9 identical-looking balls. One is slightly heavier. Using a balance scale, find the heavier ball in minimum weighings.',
    solution: 'Two weighings are enough.\n1. Divide into 3 groups of 3 (A, B, C). Weigh Group A vs B.\n- If equal, heavier is in C. If not, heavier is in the heavier group.\n2. From the heavy group of 3, weigh two balls against each other.\n- If equal, the third is heavier. If not, the scale shows the heavier one.'
  },

  // --- Behavioral ---
  {
    title: 'Tell me about a time you failed.',
    category: 'behavioral',
    difficulty: 'Easy',
    description: 'A classic behavioral interview question. How would you structure your response?',
    solution: 'Use STAR-L: Situation, Task, Action, Result, Learning. Admit the failure genuinely, explain what you learned, and how you improved to prevent it from happening again.'
  },
  {
    title: 'Why do you want to work here?',
    category: 'behavioral',
    difficulty: 'Easy',
    description: 'How to answer "Why our company?"',
    solution: '1. Research: Mention specific products, culture, or recent news.\n2. Connection: Align their goals with your career aspirations.\n3. Contribution: Explain how your skills can solve their specific challenges.'
  },
  {
    title: 'How do you handle conflict with a teammate?',
    category: 'behavioral',
    difficulty: 'Medium',
    description: 'Describe a situation where you had a clinical disagreement with a colleague.',
    solution: '1. Stay Calm: Focus on the project, not the person.\n2. Communicate: Listen to their perspective first (Active Listening).\n3. Find Common Ground: Agree on the shared goal.\n4. Data-Driven: Use data/facts to reach a consensus or involve a lead if necessary.'
  },
  {
    title: 'Describe a difficult technical challenge you solved.',
    category: 'behavioral',
    difficulty: 'Hard',
    description: 'Focus on your problem-solving process and impact.',
    solution: '1. Complexity: Clearly define why it was hard.\n2. Methodology: How did you debug? (Logs, Profiling, Rubber ducking).\n3. Action: The specific steps YOU took.\n4. Outcome: Metrics! (Reduced latency by 40%, saved $10k in infra costs).'
  },
  {
    title: 'Where do you see yourself in 5 years?',
    category: 'behavioral',
    difficulty: 'Medium',
    description: 'They want to know if you have a plan and if this role fits it.',
    solution: '1. Professional Growth: Mastery of the stacks you are working on.\n2. Leadership: Growing into a Senior or Lead Engineer role.\n3. Industry Impact: Mentoring others or contributing to architectural decisions.'
  },

  // --- Frontend ---
  {
    title: 'Virtual DOM in React',
    category: 'frontend',
    difficulty: 'Medium',
    description: 'What is Virtual DOM and how does reconciliation work?',
    solution: 'Virtual DOM is a lightweight copy of the real DOM. When state changes:\n1. A new virtual tree is created.\n2. It is compared (diffed) with the previous one.\n3. Only the differences are patched to the real DOM (Reconciliation).'
  },
  {
    title: 'Debouncing vs Throttling',
    category: 'frontend',
    difficulty: 'Medium',
    description: 'Explain the difference between debounce and throttle with examples.',
    solution: '1. Debounce: Delays execution until after some time has passed since the last call (e.g., search bar input).\n2. Throttle: Ensures execution at most once every X milliseconds (e.g., scroll event, resize event).'
  },
  {
    title: 'CSS Box Model',
    category: 'frontend',
    difficulty: 'Easy',
    description: 'Explain the distinct parts of the CSS Box Model.',
    solution: 'Content -> Padding -> Border -> Margin.\n`box-sizing: border-box` includes padding and border in the element\'s total width/height.'
  },
  {
    title: 'Closures in JavaScript',
    category: 'frontend',
    difficulty: 'Medium',
    description: 'What is a closure and why is it useful?',
    solution: 'A closure is the combination of a function and the lexical environment within which that function was declared. It allows an inner function to access variables from an outer scope even after the outer function has finished executing. Useful for data privacy (private variables).'
  },
  {
    title: 'Event Loop in JS',
    category: 'frontend',
    difficulty: 'Hard',
    description: 'Explain how the Call Stack, Event Loop, and Task Queue interact.',
    solution: '1. Call Stack: Executes synchronous code.\n2. Web APIs: Handles async tasks (setTimeout, fetch).\n3. Callback Queue / Microtask Queue: Holds callbacks when async tasks finish.\n4. Event Loop: If the stack is empty, it pushes the first task from the queue to the stack.'
  },
  // --- More Data Structures ---
  {
    title: 'Implement an LRU Cache',
    category: 'data-structures',
    difficulty: 'Hard',
    description: 'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.',
    solution: 'Use a Hash Map and a Doubly Linked List.\n1. Hash Map provides O(1) access to nodes.\n2. Doubly Linked List maintains the order of access.\n3. When a key is accessed, move the node to the head.\n4. When adding a new key, if capacity is reached, remove from the tail.'
  },
  {
    title: 'Merge Intervals',
    category: 'data-structures',
    difficulty: 'Medium',
    description: 'Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals.',
    solution: '1. Sort intervals by start time.\n2. Iterate through sorted intervals.\n3. If current interval overlaps with the last merged one, merge them by updating the end time.\n4. Else, add current interval to the list.'
  },
  // --- More Algorithms ---
  {
    title: 'N-Queens Problem',
    category: 'algorithms',
    difficulty: 'Hard',
    description: 'The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.',
    solution: 'Use backtracking. \n1. Place queens row by row. \n2. For each row, try placing a queen in each column. \n3. Check if the placement is safe (no queen in the same column or diagonals). \n4. If safe, move to the next row.'
  },
  {
    title: 'Search in Rotated Sorted Array',
    category: 'algorithms',
    difficulty: 'Medium',
    description: 'There is an integer array nums sorted in ascending order (with distinct values). Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k. Given the array nums after the rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.',
    solution: 'Use a modified binary search.\n1. Calculate mid.\n2. Determine which half (left or right) is sorted.\n3. Check if the target lies within the sorted half.\n4. Adjust left or right pointers accordingly.'
  },
  // --- More System Design ---
  {
    title: 'Design an Ad Click Counter',
    category: 'system-design',
    difficulty: 'Medium',
    description: 'Design a system to count ad clicks in real-time and provide reports.',
    solution: '1. High Write Load: Use Kafka to ingest click events.\n2. Processing: Use Flink/Spark Streaming to aggregate clicks over time windows.\n3. Storage: Use a Time-Series Database (InfluxDB) or a NoSQL DB (Cassandra) for aggregated data.\n4. Read Path: API service queries aggregated data for dashboarding.'
  },
  {
    title: 'Design a Distributed Web Crawler',
    category: 'system-design',
    difficulty: 'Hard',
    description: 'Design a web crawler that can crawl billions of pages efficiently.',
    solution: '1. URL Frontier: Queue of URLs to crawl (distributed queue).\n2. Workers: Multiple machines downloading pages.\n3. DNS Resolver: Cache results to avoid bottlenecks.\n4. Duplicate Detection: Use Bloom Filters to avoid re-crawling same URLs.\n5. Politeness: Ensure robots.txt is followed and multiple requests to same domain are rate-limited.'
  },
  // --- More Aptitude & Logic ---
  {
    title: 'The Monty Hall Problem',
    category: 'aptitude',
    difficulty: 'Medium',
    description: 'You are on a game show. There are 3 doors. Behind one is a car, behind others are goats. You pick Door 1. The host (who knows what is behind doors) opens Door 3 to reveal a goat. He then asks: Do you want to switch to Door 2? Should you?',
    solution: 'Yes, you should switch. \n1. Initially, each door has 1/3 probability.\n2. Door 1 has 1/3, and the sum of Doors 2 and 3 is 2/3.\n3. By opening Door 3 (a goat), the 2/3 probability shifts entirely to Door 2.\n4. Switching gives you a 2/3 chance of winning, while staying keeps it at 1/3.'
  },
  {
    title: 'The 100 Prisoners Problem',
    category: 'aptitude',
    difficulty: 'Hard',
    description: '100 prisoners are numbered 1-100. Their names are in 100 boxes in a room. Each prisoner enters and opens 50 boxes. They must find their own name. If ALL find their names, they are free. What is the best strategy?',
    solution: 'Cycle strategy: \n1. Each prisoner starts with the box labeled with their own number.\n2. If it contains their name, they are done.\n3. If not, the box contains another number; they go to that box next.\n4. This follows a cycle. They succeed if the largest cycle in the random permutation of 100 boxes is <= 50. The probability is ~31%.'
  },
  // --- More Behavioral ---
  {
    title: 'How do you prioritize your work?',
    category: 'behavioral',
    difficulty: 'Easy',
    description: 'They want to see your time management and decision-making skills.',
    solution: '1. Eisenhower Matrix: Categorize by Urgent/Important.\n2. Impact vs Effort: Focus on high impact tasks.\n3. Communication: Check with stakeholders to align on priorities.\n4. Tools: Mention using Jira, Trello, or simple To-Do lists.'
  },
  {
    title: 'Tell me about a time you took initiative.',
    category: 'behavioral',
    difficulty: 'Medium',
    description: 'Provide an example where you did more than what was expected.',
    solution: 'Focus on identifying a gap or problem (e.g., slow test suite, lack of documentation) and taking the lead to fix it without being asked. Outline the steps and the positive result for the team.'
  },
  // --- 60+ ADDITIONAL QUESTIONS TO REACH ~100 ---

  // DATA STRUCTURES
  {
    title: 'Middle of the Linked List',
    category: 'data-structures',
    difficulty: 'Easy',
    description: 'Given the head of a singly linked list, return the middle node of the linked list.',
    solution: 'Use slow and fast pointers. While fast and fast.next are valid, move slow by 1 and fast by 2. When fast reaches the end, slow is at the middle.'
  },
  {
    title: 'Binary Tree Level Order Traversal',
    category: 'data-structures',
    difficulty: 'Medium',
    description: 'Given the root of a binary tree, return the level order traversal of its nodes\' values. (i.e., from left to right, level by level).',
    solution: 'Use a Queue. Push root. While queue is not empty: 1. Get level size. 2. Loop size times: pop node, add val to current level list, push children to queue.'
  },
  {
    title: 'Lowest Common Ancestor of a BST',
    category: 'data-structures',
    difficulty: 'Medium',
    description: 'Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.',
    solution: '1. If both nodes are smaller than root, LCA is in the left subtree. 2. If both nodes are larger, LCA is in the right subtree. 3. Otherwise, current root is the LCA.'
  },
  {
    title: 'Implement Tries (Prefix Tree)',
    category: 'data-structures',
    difficulty: 'Medium',
    description: 'A trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings.',
    solution: 'Each node contains a map of characters to child nodes and an isEndOfWord boolean. insert(word): walk/create nodes for each char. search(word): walk nodes, check isEndOfWord at end. startsWith(prefix): walk nodes, return true if walk finishes.'
  },
  {
    title: 'Detect Cycle in Linked List',
    category: 'data-structures',
    difficulty: 'Easy',
    description: 'Given head, the head of a linked list, determine if the linked list has a cycle in it.',
    solution: 'Floyd\'s Cycle Finding Algorithm: Use two pointers (slow and fast). If they meet, there is a cycle. If fast reaches null, no cycle.'
  },
  {
    title: 'Implement Stack using Queues',
    category: 'data-structures',
    difficulty: 'Easy',
    description: 'Implement a last-in-first-out (LIFO) stack using only two queues.',
    solution: 'Push: Add to q2, then move all elements from q1 to q2, then swap q1 and q2. Pop/Top: Just pop/peek from q1. Time: Push O(N), Pop O(1).'
  },
  {
    title: 'Balanced Binary Tree',
    category: 'data-structures',
    difficulty: 'Easy',
    description: 'Given a binary tree, determine if it is height-balanced.',
    solution: 'A height-balanced tree is one where the depth of the two subtrees of every node never differs by more than 1. Use recursion to get height; return -1 if unbalanced at any point.'
  },
  {
    title: 'Invert Binary Tree',
    category: 'data-structures',
    difficulty: 'Easy',
    description: 'Given the root of a binary tree, invert the tree, and return its root.',
    solution: 'Recursive: swap(root.left, root.right), invert(root.left), invert(root.right). Iterative: Use a queue, swap children of each node popped.'
  },
  {
    title: 'Rotate Image (2D Matrix)',
    category: 'data-structures',
    difficulty: 'Medium',
    description: 'You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise) in-place.',
    solution: '1. Transpose the matrix (swap matrix[i][j] with matrix[j][i]). 2. Reverse each row.'
  },
  {
    title: 'Design HashSet',
    category: 'data-structures',
    difficulty: 'Easy',
    description: 'Design a HashSet without using any built-in hash table libraries.',
    solution: 'Use an array of buckets (e.g., size 1000). Use a simple hash function (key % size). Each bucket can be a list to handle collisions.'
  },

  // ALGORITHMS
  {
    title: 'Merge Sorted Array',
    category: 'algorithms',
    difficulty: 'Easy',
    description: 'You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n. Merge nums2 into nums1 as one sorted array.',
    solution: 'Use three pointers starting from the end of nums1, nums2, and the end of the available space in nums1. Compare and place the larger element at the back.'
  },
  {
    title: 'Container With Most Water',
    category: 'algorithms',
    difficulty: 'Medium',
    description: 'Find two lines that together with the x-axis form a container, such that the container contains the most water.',
    solution: 'Two pointers at left and right. Calculate area: min(h[l], h[r]) * (r - l). Move the pointer with the smaller height inwards. Time: O(N).'
  },
  {
    title: '3Sum',
    category: 'algorithms',
    difficulty: 'Medium',
    description: 'Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.',
    solution: '1. Sort the array. 2. Iterate with pointer i, then use two pointers (left, right) to find pairs that sum to -nums[i]. Handle duplicates.'
  },
  {
    title: 'Maximum Subarray (Kadane\'s)',
    category: 'algorithms',
    difficulty: 'Medium',
    description: 'Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.',
    solution: 'Iterate through the array. Keep currentSum. If currentSum < 0, reset to 0. Update maxSum = max(maxSum, currentSum). Handle cases with all negative numbers.'
  },
  {
    title: 'House Robber',
    category: 'algorithms',
    difficulty: 'Medium',
    description: 'You are planning to rob houses along a street. Each house has a certain amount of money stashed. You cannot rob two adjacent houses. Return the max amount.',
    solution: 'Dynamic Programming: dp[i] = max(dp[i-2] + nums[i], dp[i-1]). Only need two variables to track previous states. Space: O(1).'
  },
  {
    title: 'Coin Change',
    category: 'algorithms',
    difficulty: 'Medium',
    description: 'Given an integer array coins and an integer amount, return the fewest number of coins that you need to make up that amount.',
    solution: 'DP: dp[i] is the min coins for amount i. dp[i] = min(dp[i - coin] + 1) for all coins. Initialize dp with amount + 1. If result > amount, return -1.'
  },
  {
    title: 'Binary Search',
    category: 'algorithms',
    difficulty: 'Easy',
    description: 'Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums.',
    solution: 'Standard binary search using low and high pointers. mid = Math.floor((low + high) / 2). Adjust pointers based on comparison with target.'
  },
  {
    title: 'First Bad Version',
    category: 'algorithms',
    difficulty: 'Easy',
    description: 'You have n versions [1, 2, ..., n] and you want to find out the first bad one, which causes all the following ones to be bad.',
    solution: 'Binary Search between 1 and n. If isBadVersion(mid) is true, high = mid. Else low = mid + 1. Search ends when low == high.'
  },
  {
    title: 'Word Search',
    category: 'algorithms',
    difficulty: 'Medium',
    description: 'Given an m x n grid of characters board and a string word, return true if word exists in the grid.',
    solution: 'Backtracking/DFS: For each cell, start DFS. Check if char matches. Mark visited (e.g. board[i][j]=\'#\'), explore neighbors, then backtrack.'
  },
  {
    title: 'Subsets',
    category: 'algorithms',
    difficulty: 'Medium',
    description: 'Given an integer array nums of unique elements, return all possible subsets (the power set).',
    solution: 'Backtracking: function(index, currentSubset). For each step, either include nums[index] or don\'t. Base case: index == nums.length.'
  },

  // SYSTEM DESIGN
  {
    title: 'Design a Key-Value Store',
    category: 'system-design',
    difficulty: 'Medium',
    description: 'Design a distributed key-value store like Redis.',
    solution: '1. Data Model: HashMap. 2. Partitioning: Consistent Hashing. 3. Replication: Quorum-based (W + R > N). 4. Consistency: Eventual consistency with Vector Clocks.'
  },
  {
    title: 'Design a Web Crawler',
    category: 'system-design',
    difficulty: 'Hard',
    description: 'Design a system to crawl and index web pages.',
    solution: '1. URL Frontier (Distributed Queue). 2. Fetchers (Multi-threaded). 3. DNS Resolver (Cached). 4. Content Deduplication (Bloom Filters/Hashing). 5. Politeness (Robots.txt).'
  },
  {
    title: 'Design a Notification System',
    category: 'system-design',
    difficulty: 'Medium',
    description: 'Design a system to send push notifications, emails, and SMS.',
    solution: '1. API Gateway for requests. 2. Task Queue (Kafka/RabbitMQ) for async processing. 3. Throttling and Priority logic. 4. Support for high-volume delivery through 3rd party APIs (Twilio, SendGrid).'
  },
  {
    title: 'Cache Eviction Policies',
    category: 'system-design',
    difficulty: 'Easy',
    description: 'Explain common cache eviction algorithms.',
    solution: '1. LRU (Least Recently Used). 2. LFU (Least Frequently Used). 3. FIFO (First In First Out). 4. Random selection.'
  },
  {
    title: 'Design a News Feed',
    category: 'system-design',
    difficulty: 'Hard',
    description: 'Design a news feed system like Facebook or Twitter.',
    solution: '1. Fan-out approach (Push on Write): Store feed for each user in cache. 2. Pull approach (Pull on Read): Fetch friends\' posts on refresh. 3. Hybrid: Push for normal users, Pull for celebrities.'
  },
  {
    title: 'API Versioning Strategies',
    category: 'system-design',
    difficulty: 'Easy',
    description: 'What are the main ways to version an API?',
    solution: '1. URI Path Versioning (/v1/users). 2. Query Param Versioning (?version=1). 3. Header Versioning (Accept: application/vnd.company.v1+json).'
  },
  {
    title: 'Design a Polling System',
    category: 'system-design',
    difficulty: 'Medium',
    description: 'Design a real-time polling system where users can vote and see live results.',
    solution: '1. WebSockets for real-time updates. 2. Redis for fast vote counting (INCR). 3. Load Balancer for horizontal scaling. 4. Throttling to prevent duplicate voting.'
  },
  {
    title: 'CAP Theorem and Trade-offs',
    category: 'system-design',
    difficulty: 'Medium',
    description: 'Explain CAP Theorem and give examples of CP and AP systems.',
    solution: 'Consistency, Availability, Partition Tolerance. Only 2 of 3 are possible during network partition. CP: HBase, MongoDB (Strong consistency). AP: Cassandra, DynamoDB (High availability/eventual consistency).'
  },
  {
    title: 'Microservices vs Monolith',
    category: 'system-design',
    difficulty: 'Easy',
    description: 'What are the pros and cons of microservices?',
    solution: 'Pros: Scalability, independent deployment, tech stack flexibility. Cons: Complexity in communication, data consistency (distributed transactions), operational overhead.'
  },
  {
    title: 'Database Sharding',
    category: 'system-design',
    difficulty: 'Medium',
    description: 'Explain horizontal scaling by database sharding.',
    solution: 'Partitioning data across multiple database instances based on a shard key (e.g., user_id). Handles high write load. Challenges: Joins across shards, resharding.'
  },

  // APTITUDE
  {
    title: 'Missing Number',
    category: 'aptitude',
    difficulty: 'Easy',
    description: 'Find the missing number in an array of 1 to N.',
    solution: 'Sum of first N natural numbers = N(N+1)/2. Subtract actual sum from this value.'
  },
  {
    title: 'Odd Man Out',
    category: 'aptitude',
    difficulty: 'Easy',
    description: 'Find the odd one out: 3, 5, 7, 12, 17, 19.',
    solution: '12 is the only even number. All others are prime numbers.'
  },
  {
    title: 'Time and Work',
    category: 'aptitude',
    difficulty: 'Medium',
    description: 'A can do a work in 15 days and B in 20 days. If they work on it together for 4 days, then the fraction of the work that is left is?',
    solution: '1-day work: A=1/15, B=1/20. Together in 1 day: (1/15 + 1/20) = 7/60. In 4 days: 4 * (7/60) = 7/15. Work left = 1 - 7/15 = 8/15.'
  },
  {
    title: 'Profit and Loss',
    category: 'aptitude',
    difficulty: 'Easy',
    description: 'If a person sells an article for $650, gaining 1/12 of his outlay. What is his cost price?',
    solution: 'Gain = CP/12. SP = CP + CP/12 = 13CP/12. Given SP = 650. 650 = 13CP/12. CP = (650 * 12) / 13 = 50 * 12 = $600.'
  },
  {
    title: 'Simple Interest',
    category: 'aptitude',
    difficulty: 'Easy',
    description: 'Find the simple interest on $5000 at 10% per annum for 3 years.',
    solution: 'SI = (P * R * T) / 100 = (5000 * 10 * 3) / 100 = $1500.'
  },
  {
    title: 'Percentage Problem',
    category: 'aptitude',
    difficulty: 'Medium',
    description: 'In an election, a candidate gets 40% of the total votes and is defeated by another candidate by 298 votes. What is the total number of votes?',
    solution: 'Winner gets 60%, Loser gets 40%. Difference = 20%. Given 20% of Total = 298. Total = (298 * 100) / 20 = 1490.'
  },
  {
    title: 'Handshake Problem',
    category: 'aptitude',
    difficulty: 'Easy',
    description: 'In a party of 10 people, if everyone shakes hands once with everyone else, how many handshakes take place?',
    solution: 'Use Combination formula nC2 = n(n-1)/2 = 10 * 9 / 2 = 45.'
  },
  {
    title: 'Speed, Distance, Time',
    category: 'aptitude',
    difficulty: 'Medium',
    description: 'Two trains start at the same time from two stations and proceed towards each other at 20 km/h and 25 km/h. When they meet, one train has traveled 80 km more than the other. Find the distance between stations.',
    solution: 'Relative speed = 45 km/h. Difference in speed = 5 km/h. Time taken to have 80 km difference = 80 / 5 = 16 hours. Distance = Total Relative Speed * Time = 45 * 16 = 720 km.'
  },
  {
    title: 'Clock Angle Problem',
    category: 'aptitude',
    difficulty: 'Medium',
    description: 'Find the angle between the hands of a clock at 3:30.',
    solution: 'Formula: |30h - 5.5m| where h=3, m=30. Angle = |30*3 - 5.5*30| = |90 - 165| = 75 degrees.'
  },
  {
    title: 'Number Series',
    category: 'aptitude',
    difficulty: 'Easy',
    description: 'Find the next number in the series: 2, 6, 12, 20, 30, ?',
    solution: 'Differences are: 4, 6, 8, 10... so next difference is 12. 30 + 12 = 42.'
  },

  // BEHAVIORAL
  {
    title: 'How do you handle tight deadlines?',
    category: 'behavioral',
    difficulty: 'Medium',
    description: 'Provide an example of a time you were under significant pressure to deliver.',
    solution: '1. Prioritize critical tasks. 2. Communicate early with stakeholders if delays are likely. 3. Manage stress through focus. 4. Reflect on how to improve planning for next time.'
  },
  {
    title: 'What is your greatest weakness?',
    category: 'behavioral',
    difficulty: 'Easy',
    description: 'They want to see self-awareness and improvement drive.',
    solution: 'Choose a real but minor professional weakness (e.g., public speaking, over-committing). Explain how you are actively working to fix it (taking courses, practicing more).'
  },
  {
    title: 'Tell me about a time you worked in a team.',
    category: 'behavioral',
    difficulty: 'Easy',
    description: 'Demonstrate collaboration and role awareness.',
    solution: 'Describe a project. Highlight your specific contribution, how you collaborated with others, and the team success. Don\'t say "I" too much, emphasize the "We".'
  },
  {
    title: 'How do you stay updated with technology?',
    category: 'behavioral',
    difficulty: 'Easy',
    description: 'Show your passion for learning and curiosity.',
    solution: 'Mention specific blogs, podcasts, newsletters, or online courses. Talk about side projects or experiments you are doing to learn new frameworks/tools.'
  },
  {
    title: 'Describe your favorite project.',
    category: 'behavioral',
    difficulty: 'Medium',
    description: 'Show enthusiasm and deep technical understanding.',
    solution: 'Explain the "Why", the "How", and the "What". Talk about the challenges, the tech stack chosen, and the final impact. Be ready to dive deep into details if asked.'
  },
  {
    title: 'What would your colleagues say about you?',
    category: 'behavioral',
    difficulty: 'Easy',
    description: 'Check for team fit and self-perception.',
    solution: 'Focus on positive, team-building traits like "reliable", "eager to help", "quick learner", or "great technical debugger".'
  },
  {
    title: 'How do you handle negative feedback?',
    category: 'behavioral',
    difficulty: 'Medium',
    description: 'They want to see growth mindset.',
    solution: '1. Don\'t get defensive. 2. Listen and ask clarifying questions. 3. Say thank you. 4. Create an action plan to address the feedback. 5. Follow up later to show progress.'
  },
  {
    title: 'Tell me about a time you mentored someone.',
    category: 'behavioral',
    difficulty: 'Medium',
    description: 'Show leadership potential.',
    solution: 'Identify a specific situation where you helped a junior or teammate learn a new skill. Explain the process used (pair programming, code reviews) and the growth of the mentee.'
  },
  {
    title: 'Where do you work best?',
    category: 'behavioral',
    difficulty: 'Easy',
    description: 'They want to check environment fit.',
    solution: 'Be honest but flexible. If it\'s remote vs office, explain the conditions that help you focus best while acknowledging the importance of team collaboration.'
  },
  {
    title: 'What are you looking for in your next role?',
    category: 'behavioral',
    difficulty: 'Easy',
    description: 'Align your goals with the company.',
    solution: 'Mention growth opportunities, technical challenges that match your interests, a collaborative culture, and the chance to contribute to impactful products.'
  },

  // FRONTEND
  {
    title: 'Difference between let, const, and var',
    category: 'frontend',
    difficulty: 'Easy',
    description: 'Explain scope and hoisting for these JS keywords.',
    solution: 'var is function-scoped and hoisted with undefined. let/const are block-scoped and not hoisted (temporal dead zone). const cannot be reassigned (though objects/arrays are mutable).'
  },
  {
    title: 'React Life Cycle Methods (Hooks)',
    category: 'frontend',
    difficulty: 'Medium',
    description: 'How would you replicate componentDidMount, componentDidUpdate and componentWillUnmount with useEffect?',
    solution: 'Mount: useEffect(() => {}, []). Update: useEffect(() => {}, [deps]). Unmount: useEffect(() => { return () => { cleanup } }, []).'
  },
  {
    title: 'Explain Flexbox and CSS Grid',
    category: 'frontend',
    difficulty: 'Easy',
    description: 'When would you use one over the other?',
    solution: 'Flexbox is mainly 1D (rows or columns). Best for components. CSS Grid is 2D (rows and columns). Best for page layouts.'
  },
  {
    title: 'What is CORS?',
    category: 'frontend',
    difficulty: 'Medium',
    description: 'Explain Cross-Origin Resource Sharing and how it works.',
    solution: 'CORS is a browser security mechanism that allows/blocks requests from different origins. Server must send appropriate "Access-Control-Allow-Origin" headers.'
  },
  {
    title: 'State Management in React',
    category: 'frontend',
    difficulty: 'Medium',
    description: 'Comparison between useState, Context API, and Redux.',
    solution: 'useState: Local component state. Context API: Avoid prop drilling for deeply nested components. Redux: Global, centralized state with predictable updates (actions/reducers) for large apps.'
  },
  {
    title: 'TypeScript Benefits',
    category: 'frontend',
    difficulty: 'Easy',
    description: 'Why use TypeScript over JavaScript?',
    solution: 'Type safety (catch bugs at compile time), better IDE tooling (intellisense), self-documenting code, easier refactoring for large codebases.'
  },
  {
    title: 'Responsive Web Design',
    category: 'frontend',
    difficulty: 'Easy',
    description: 'What are the main techniques for responsive design?',
    solution: '1. Fluid layouts (percentages). 2. Media queries. 3. Responsive images (srcset). 4. Mobile-first approach.'
  },
  {
    title: 'Web Accessibility (A11y)',
    category: 'frontend',
    difficulty: 'Medium',
    description: 'What are some basic practices to make a site accessible?',
    solution: '1. Semantic HTML. 2. ARIA labels. 3. Alt text for images. 4. Keyboard navigation support. 5. High color contrast.'
  },
  {
    title: 'SSR vs CSR vs SSG',
    category: 'frontend',
    difficulty: 'Hard',
    description: 'Explain Client-Side Rendering, Server-Side Rendering and Static Site Generation.',
    solution: 'CSR: Browser downloads JS and renders everything (SPA). SSR: Server renders HTML on each request (Next.js). SSG: HTML is pre-built at compile time (Gatsby).'
  },
  {
    title: 'What is a Single Page Application (SPA)?',
    category: 'frontend',
    difficulty: 'Easy',
    description: 'Explain the concept of an SPA and its main advantages.',
    solution: 'An SPA loads a single HTML page and dynamically updates content as the user interacts. Advantage: faster transitions after initial load, native-app feel.'
  }
];

const importData = async () => {
  try {
    await Question.deleteMany(); // Clear existing
    await Question.insertMany(questions);
    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Question.deleteMany();
    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
