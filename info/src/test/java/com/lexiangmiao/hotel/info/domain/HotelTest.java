package com.lexiangmiao.hotel.info.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.lexiangmiao.hotel.info.web.rest.TestUtil;

public class HotelTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Hotel.class);
        Hotel hotel1 = new Hotel();
        hotel1.setId(1L);
        Hotel hotel2 = new Hotel();
        hotel2.setId(hotel1.getId());
        assertThat(hotel1).isEqualTo(hotel2);
        hotel2.setId(2L);
        assertThat(hotel1).isNotEqualTo(hotel2);
        hotel1.setId(null);
        assertThat(hotel1).isNotEqualTo(hotel2);
    }
}
