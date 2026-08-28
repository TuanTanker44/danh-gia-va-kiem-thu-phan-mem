package com.example.analyzer;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

/**
 * Path coverage: exercises every distinct sequence of decisions through
 * {@link NumberAnalyzer#analyze(int[])}, i.e. every combination of
 * (loop iteration count, even/odd branch taken per iteration, final
 * MORE_EVEN/MORE_ODD/EQUAL branch) that is actually reachable.
 *
 * Each test name/comment records the path as a sequence of decisions:
 *  L0        = loop body never entered
 *  L1(E)/L1(O)      = one iteration, even/odd branch
 *  L2(E,E)/(O,O)/(E,O)/(O,E) = two iterations, branch taken each time, in order
 *  L3(...)   = three iterations, branch taken each time, in order
 */
class NumberAnalyzerPathCoverageTest {

    private final NumberAnalyzer analyzer = new NumberAnalyzer();

    @Test
    void path_L0_equal() {
        // 0 iterations -> EQUAL
        assertEquals(":EQUAL", analyzer.analyze(new int[]{}));
    }

    @Test
    void path_L1_even_moreEven() {
        // 1 iteration, even -> MORE_EVEN
        assertEquals("E:MORE_EVEN", analyzer.analyze(new int[]{2}));
    }

    @Test
    void path_L1_odd_moreOdd() {
        // 1 iteration, odd -> MORE_ODD
        assertEquals("O:MORE_ODD", analyzer.analyze(new int[]{1}));
    }

    @Test
    void path_L2_evenEven_moreEven() {
        // 2 iterations, even then even -> MORE_EVEN
        assertEquals("EE:MORE_EVEN", analyzer.analyze(new int[]{2, 4}));
    }

    @Test
    void path_L2_oddOdd_moreOdd() {
        // 2 iterations, odd then odd -> MORE_ODD
        assertEquals("OO:MORE_ODD", analyzer.analyze(new int[]{1, 3}));
    }

    @Test
    void path_L2_evenThenOdd_equal() {
        // 2 iterations, even then odd -> EQUAL
        assertEquals("EO:EQUAL", analyzer.analyze(new int[]{2, 1}));
    }

    @Test
    void path_L2_oddThenEven_equal() {
        // 2 iterations, odd then even -> EQUAL (distinct decision sequence
        // from evenThenOdd, even though the final branch matches)
        assertEquals("OE:EQUAL", analyzer.analyze(new int[]{1, 2}));
    }

    @Test
    void path_L3_evenEvenOdd_moreEven() {
        // 3 iterations, even, even, odd -> MORE_EVEN
        assertEquals("EEO:MORE_EVEN", analyzer.analyze(new int[]{2, 4, 1}));
    }

    @Test
    void path_L3_oddOddEven_moreOdd() {
        // 3 iterations, odd, odd, even -> MORE_ODD
        assertEquals("OOE:MORE_ODD", analyzer.analyze(new int[]{1, 3, 2}));
    }
}
