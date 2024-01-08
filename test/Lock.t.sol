// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.23;

import {Test} from "forge-std/Test.sol";

import {Lock} from "contracts/Lock.sol";

contract LockTest is Test {
    uint256 ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
    uint256 lockedAmount = 1 gwei;
    uint256 unlockTime;

    Lock public lock;

    function setUp() public {
        unlockTime = (block.timestamp + ONE_YEAR_IN_SECS);

        lock = new Lock{value: lockedAmount}(unlockTime);
    }

    function testUnlockTime() public {
        assertEq(lock.unlockTime(), unlockTime);
    }
}
