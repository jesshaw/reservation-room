package com.lexiangmiao.hotel.info.domain;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * 酒店
 */
@ApiModel(description = "酒店")
@Entity
@Table(name = "hotel")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Hotel implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * 名称
     */
    @NotNull
    @ApiModelProperty(value = "名称", required = true)
    @Column(name = "name", nullable = false)
    private String name;

    /**
     * 地址
     */
    @NotNull
    @ApiModelProperty(value = "地址", required = true)
    @Column(name = "address", nullable = false)
    private String address;

    /**
     * 邮编
     */
    @ApiModelProperty(value = "邮编")
    @Column(name = "post_code")
    private String postCode;

    /**
     * 城市
     */
    @NotNull
    @ApiModelProperty(value = "城市", required = true)
    @Column(name = "city", nullable = false)
    private String city;

    /**
     * 网址
     */
    @ApiModelProperty(value = "网址")
    @Column(name = "url")
    private String url;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Hotel name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public Hotel address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPostCode() {
        return postCode;
    }

    public Hotel postCode(String postCode) {
        this.postCode = postCode;
        return this;
    }

    public void setPostCode(String postCode) {
        this.postCode = postCode;
    }

    public String getCity() {
        return city;
    }

    public Hotel city(String city) {
        this.city = city;
        return this;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getUrl() {
        return url;
    }

    public Hotel url(String url) {
        this.url = url;
        return this;
    }

    public void setUrl(String url) {
        this.url = url;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Hotel)) {
            return false;
        }
        return id != null && id.equals(((Hotel) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Hotel{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", address='" + getAddress() + "'" +
            ", postCode='" + getPostCode() + "'" +
            ", city='" + getCity() + "'" +
            ", url='" + getUrl() + "'" +
            "}";
    }
}
