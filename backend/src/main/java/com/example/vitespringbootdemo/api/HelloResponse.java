package com.example.vitespringbootdemo.api;

/**
 * 响应 DTO：返回给前端的 message。
 */
public class HelloResponse {
	private final String message;

	public HelloResponse(String message) {
		this.message = message;
	}

	public String getMessage() {
		return message;
	}
}

