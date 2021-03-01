package nl.utwente.utml;

import nl.utwente.utml.model.Diagram;
import nl.utwente.utml.model.DiagramRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@SpringBootApplication
@RestController
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
