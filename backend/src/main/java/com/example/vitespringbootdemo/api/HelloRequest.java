package com.example.vitespringbootdemo.api;

/**
 * 请求 DTO：接收前端传入的 name。
 */
public class HelloRequest {
	private String name;

	public HelloRequest() {
	}

	public HelloRequest(String name) {
		this.name = name;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}

