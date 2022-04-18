package com.group9.leipajono.repositories;

import com.group9.leipajono.data.Contents;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

@Repository
public interface ContentsRepository extends JpaRepository<Contents, Long>{
    List<Contents> findByProductId(long productId);
    @Query("SELECT coalesce(max(c.id), 0) FROM Contents c")
    Long getMaxContentsId();
    Long removeByProductId(long productId);
}
