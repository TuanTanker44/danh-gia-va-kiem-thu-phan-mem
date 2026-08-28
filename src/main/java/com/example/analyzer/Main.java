package com.example.analyzer;

public class Main {
    public static void main(String[] args) {
        NumberAnalyzer analyzer = new NumberAnalyzer();
        int[][] samples = {
            {},
            {1},
            {2, 4},
            {1, 3},
            {1, 2}
        };
        for (int[] numbers : samples) {
            String label = java.util.Arrays.toString(numbers);
            System.out.println("analyze(" + label + ") = " + analyzer.analyze(numbers));
        }
    }
}
