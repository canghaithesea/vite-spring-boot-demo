package com.example.vitespringbootdemo.api;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 极简接口：POST /api/hello
 */
@RestController
@RequestMapping("/api")
public class HelloController {

	@PostMapping("/hello")
	public HelloResponse hello(@RequestBody HelloRequest request) {
		// 极简：不做复杂校验，避免空指针即可
		String name = request == null || request.getName() == null ? "" : request.getName();
		return new HelloResponse("Hello, " + name + "! 来自Spring Boot后端");
	}
}

