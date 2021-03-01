package nl.utwente.utml;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
@ComponentScan(basePackages="nl.utwente.utml")
@RequestMapping("/api")
public class UtmlApplication {

	@GetMapping("/test")
	public String home() {
		return "Hello World";
	}
	public static void main(String[] args) {
		SpringApplication.run(UtmlApplication.class, args);
	}

}
