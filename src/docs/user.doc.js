
/**
 * @swagger
 * /user/userVerify:
 *   post:
 *     summary: Verify a user by email and verification code
 *     description: Checks if a user with the given email and code exists.
 *     tags:
 *         - users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: "umer@gmail.com"
 *     responses:
 *       200:
 *         description: User verified successfully
 *       400:
 *         description: Invalid email
 *       500:
 *         description: Server error
 */


/**
 * @swagger
 * /user/userCode:
 *   post:
 *     summary: Send a verification code to the user
 *     tags:
 *          - users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *             properties:
 *               code:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Code sent successfully
 *       400:
 *         description: Unauthorized
 */
