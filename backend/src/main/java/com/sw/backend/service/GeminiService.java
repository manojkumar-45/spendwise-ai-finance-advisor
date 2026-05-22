package com.sw.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class GeminiService {

    private final String apiKey;
    private final String model;

    // Constructor Injection
    public GeminiService(
            @Value("${gemini.api-key}") String apiKey,
            @Value("${gemini.model}") String model) {

        this.apiKey = apiKey;
        this.model = model;
    }

    public String getAdvice(String prompt) throws Exception {

        String safePrompt = prompt.replace("\"", "\\\"");

        String requestBody = """
{
  "contents": [
    {
      "parts": [
        { "text": "%s" }
      ]
    }
  ],
  "generationConfig": {
    "temperature": 0.7,
    "maxOutputTokens": 2048,
    "topP": 0.95
  }
}
""".formatted(safePrompt);

        String url = "https://generativelanguage.googleapis.com/v1beta/models/"
                + model +
                ":generateContent?key=" + apiKey;

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                .build();

        HttpClient client = HttpClient.newHttpClient();
        HttpResponse<String> response =
                client.send(request, HttpResponse.BodyHandlers.ofString());

//        System.out.println(response.body());


        ObjectMapper mapper = new ObjectMapper();
        JsonNode root = mapper.readTree(response.body());

        if (root.has("candidates")) {
            JsonNode textNode =
                    root.at("/candidates/0/content/parts/0/text");

            if (!textNode.isMissingNode()) {
                return textNode.asText().trim();
            }
        }

        return "AI response unavailable.";
    }
}