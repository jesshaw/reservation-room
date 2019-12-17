package com.lexiangmiao.hotel.info.web.rest;

import com.lexiangmiao.hotel.info.domain.Hotel;
import com.lexiangmiao.hotel.info.service.HotelService;
import com.lexiangmiao.hotel.info.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.lexiangmiao.hotel.info.domain.Hotel}.
 */
@RestController
@RequestMapping("/api")
public class HotelResource {

    private final Logger log = LoggerFactory.getLogger(HotelResource.class);

    private static final String ENTITY_NAME = "infoHotel";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final HotelService hotelService;

    public HotelResource(HotelService hotelService) {
        this.hotelService = hotelService;
    }

    /**
     * {@code POST  /hotels} : Create a new hotel.
     *
     * @param hotel the hotel to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new hotel, or with status {@code 400 (Bad Request)} if the hotel has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/hotels")
    public ResponseEntity<Hotel> createHotel(@Valid @RequestBody Hotel hotel) throws URISyntaxException {
        log.debug("REST request to save Hotel : {}", hotel);
        if (hotel.getId() != null) {
            throw new BadRequestAlertException("A new hotel cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Hotel result = hotelService.save(hotel);
        return ResponseEntity.created(new URI("/api/hotels/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /hotels} : Updates an existing hotel.
     *
     * @param hotel the hotel to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated hotel,
     * or with status {@code 400 (Bad Request)} if the hotel is not valid,
     * or with status {@code 500 (Internal Server Error)} if the hotel couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/hotels")
    public ResponseEntity<Hotel> updateHotel(@Valid @RequestBody Hotel hotel) throws URISyntaxException {
        log.debug("REST request to update Hotel : {}", hotel);
        if (hotel.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Hotel result = hotelService.save(hotel);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, hotel.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /hotels} : get all the hotels.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of hotels in body.
     */
    @GetMapping("/hotels")
    public ResponseEntity<List<Hotel>> getAllHotels(Pageable pageable) {
        log.debug("REST request to get a page of Hotels");
        Page<Hotel> page = hotelService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /hotels/:id} : get the "id" hotel.
     *
     * @param id the id of the hotel to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the hotel, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/hotels/{id}")
    public ResponseEntity<Hotel> getHotel(@PathVariable Long id) {
        log.debug("REST request to get Hotel : {}", id);
        Optional<Hotel> hotel = hotelService.findOne(id);
        return ResponseUtil.wrapOrNotFound(hotel);
    }

    /**
     * {@code DELETE  /hotels/:id} : delete the "id" hotel.
     *
     * @param id the id of the hotel to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/hotels/{id}")
    public ResponseEntity<Void> deleteHotel(@PathVariable Long id) {
        log.debug("REST request to delete Hotel : {}", id);
        hotelService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
