/**
 * @swagger
 * /wallet:
 *   post:
 *     summary: Create a user wallet linked to their account
 *     tags: 
 *       - chain
 *     requestBody:
 *       required: false
 *       content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  example: {}
 *     responses:
 *       200:
 *         description: Wallet created successfully
 *       400:
 *         description: Wallet already exists
 *       404:
 *         description: Error from frontend
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /userWallets:
 *      get:
 *          tags:
 *              - chain
 *          responses:
 *              200:
 *                  description: user see own wallet's address
 *              400:
 *                  description: addresses not created
 *              500:
 *                  description: server error 
 */
/**
 * @swagger
 * /tokenDetail/{address}:
 *   get:
 *     tags:
 *       - chain
 *     summary: Get the token details by token address
 *     parameters:
 *       - in: path
 *         name: address
 *         required: true
 *         schema:
 *           type: string
 *           pattern: "^0x[a-fA-F0-9]{40}$"
 *         description: The token contract address (Ethereum style 0x...)
 *     responses:
 *       200:
 *         description: Details retrieved successfully
 *       400:
 *         description: Invalid token
 *       500:
 *         description: Server error
 */
