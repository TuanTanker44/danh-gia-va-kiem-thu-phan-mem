package com.example.analyzer;

public class Main {
    public static void main(String[] args) {
        NumberAnalyzer analyzer = new NumberAnalyzer();
        int[] samples = {0, 1, 4, 5, 10};
        for (int n : samples) {
            System.out.println("analyze(" + n + ") = " + analyzer.analyze(n));
        }
    }
}
