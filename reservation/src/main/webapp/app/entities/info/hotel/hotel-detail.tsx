import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, UncontrolledTooltip, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './hotel.reducer';
import { IHotel } from 'app/shared/model/info/hotel.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IHotelDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class HotelDetail extends React.Component<IHotelDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { hotelEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="reservationApp.infoHotel.detail.title">Hotel</Translate> [<b>{hotelEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="reservationApp.infoHotel.name">Name</Translate>
              </span>
              <UncontrolledTooltip target="name">
                <Translate contentKey="reservationApp.infoHotel.help.name" />
              </UncontrolledTooltip>
            </dt>
            <dd>{hotelEntity.name}</dd>
            <dt>
              <span id="address">
                <Translate contentKey="reservationApp.infoHotel.address">Address</Translate>
              </span>
              <UncontrolledTooltip target="address">
                <Translate contentKey="reservationApp.infoHotel.help.address" />
              </UncontrolledTooltip>
            </dt>
            <dd>{hotelEntity.address}</dd>
            <dt>
              <span id="postCode">
                <Translate contentKey="reservationApp.infoHotel.postCode">Post Code</Translate>
              </span>
              <UncontrolledTooltip target="postCode">
                <Translate contentKey="reservationApp.infoHotel.help.postCode" />
              </UncontrolledTooltip>
            </dt>
            <dd>{hotelEntity.postCode}</dd>
            <dt>
              <span id="city">
                <Translate contentKey="reservationApp.infoHotel.city">City</Translate>
              </span>
              <UncontrolledTooltip target="city">
                <Translate contentKey="reservationApp.infoHotel.help.city" />
              </UncontrolledTooltip>
            </dt>
            <dd>{hotelEntity.city}</dd>
            <dt>
              <span id="url">
                <Translate contentKey="reservationApp.infoHotel.url">Url</Translate>
              </span>
              <UncontrolledTooltip target="url">
                <Translate contentKey="reservationApp.infoHotel.help.url" />
              </UncontrolledTooltip>
            </dt>
            <dd>{hotelEntity.url}</dd>
          </dl>
          <Button tag={Link} to="/hotel" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/hotel/${hotelEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ hotel }: IRootState) => ({
  hotelEntity: hotel.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HotelDetail);
