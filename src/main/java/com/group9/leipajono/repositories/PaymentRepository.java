package com.group9.leipajono.repositories;

import com.group9.leipajono.data.Payment;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
   @Query("SELECT coalesce(max(p.id), 0) FROM Payment p")
   Long getMaxPaymentId();
   List<Payment> findPaymentByOrderId(Long orderId);
}
