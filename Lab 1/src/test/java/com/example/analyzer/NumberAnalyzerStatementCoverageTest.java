package com.example.analyzer;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

/**
 * Statement coverage: every executable statement in
 * {@link NumberAnalyzer#analyze(int[])} runs at least once across the suite.
 *
 * Statements to hit:
 *  1. loop with zero iterations (loop guard evaluated, body skipped)
 *  2. loop body + even branch
 *  3. loop body + odd branch
 *  4. summary = MORE_EVEN
 *  5. summary = MORE_ODD
 *  6. summary = EQUAL
 */
class NumberAnalyzerStatementCoverageTest {

    private final NumberAnalyzer analyzer = new NumberAnalyzer();

    @Test
    void emptyInput_hitsZeroIterationLoopAndEqualBranch() {
        assertEquals(":EQUAL", analyzer.analyze(new int[]{}));
    }

    @Test
    void singleEvenNumber_hitsEvenBranchAndMoreEvenBranch() {
        assertEquals("E:MORE_EVEN", analyzer.analyze(new int[]{2}));
    }

    @Test
    void singleOddNumber_hitsOddBranchAndMoreOddBranch() {
        assertEquals("O:MORE_ODD", analyzer.analyze(new int[]{1}));
    }
}
