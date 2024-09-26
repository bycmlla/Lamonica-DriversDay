package com.datavisualization.driverday;

/*import ch.qos.logback.core.net.SyslogOutputStream;*/
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
/*import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;*/

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.datavisualization.driverday.repository")
public class DriverdayApplication {

	public static void main(String[] args) {
		SpringApplication.run(DriverdayApplication.class, args);
    System.out.println("olá minions");
	}

}
