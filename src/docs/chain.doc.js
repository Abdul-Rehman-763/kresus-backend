/**
 * @swagger
 * /wallet:
 *   post:
 *     summary: Create a user wallet linked to their account
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
 *          responses:
 *              200:
 *                  description: user see own wallet's address
 *              400:
 *                  description: addresses not created
 *              500:
 *                  description: server error 
 */